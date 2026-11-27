import {
    _decorator, AudioClip, AudioSource, Color, Component, EventTouch, instantiate, Label, Node, Prefab,
    profiler, Sprite, SpriteAtlas, SpriteFrame, sys, UITransform, Vec2, Vec3, view,
} from 'cc';
import { ALLOY_ITEM_FRAMES } from './AlloyArt';
import { ALLOY_CHAPTERS, ALLOY_ROUTE_LABELS } from './AlloyCampaign';
import { AlloyGameState, ENERGY_CAPACITY, getAlloyItemName } from './AlloyGameState';
import type { AlloyItem, AlloyTutorialStep } from './AlloyGameState';
import { AlloyLayout } from './AlloyLayout';
import { AlloySdkAdapter } from './AlloySdkAdapter';
import type { AlloySdkEvent } from './AlloySdkAdapter';

const { ccclass, property } = _decorator;
const PROGRESS_KEY = 'ProjectAlloy.progress.v1';
const COLORS = {
    activeText: new Color(58, 42, 31),
    mutedText: new Color(97, 79, 66),
    inactive: new Color(219, 208, 193),
    green: new Color(165, 219, 153),
    orange: new Color(255, 198, 119),
    emptyTile: new Color(233, 223, 207),
    filledTile: new Color(255, 250, 237),
    blocked: new Color(247, 176, 160),
};
const GUIDE: Record<AlloyTutorialStep, { title: string; instruction: string }> = {
    generate: { title: '1 / 3   补一份食材', instruction: '点一下补货台的按钮。' },
    merge: { title: '2 / 3   合成贝果', instruction: '把一团面团拖到另一团面团上。' },
    deliver: { title: '3 / 3   交付首单', instruction: '点击交付，把贝果送给顾客。' },
    complete: { title: '餐坊操作', instruction: '同类同阶可合成。点选多余道具后可回收。' },
};

interface BoardGesture {
    readonly touchId: number;
    readonly from: number;
    readonly x: number;
    readonly y: number;
    dragging: boolean;
    hover: number;
}

@ccclass('AlloyGame')
export class AlloyGame extends Component {
    @property({ type: AudioClip, tooltip: '有效操作后开始循环播放的背景音乐。' })
    public musicClip: AudioClip | null = null;

    @property({ type: AudioClip, tooltip: '成功补货时播放的音效。' })
    public generateClip: AudioClip | null = null;

    @property({ type: AudioClip, tooltip: '两件物品成功合成时播放的音效。' })
    public mergeClip: AudioClip | null = null;

    @property({ type: AudioClip, tooltip: '成功交付订单并领取奖励时播放的音效。' })
    public orderClip: AudioClip | null = null;

    @property({ type: AlloySdkAdapter, tooltip: '供试玩广告平台接收玩法事件的 SDK 适配组件。' })
    public sdkAdapter: AlloySdkAdapter | null = null;

    @property({ type: Prefab, tooltip: '横屏时使用的餐坊布局，可双击预制体调整位置和换图。' })
    public landscapeLayout: Prefab | null = null;

    @property({ type: Prefab, tooltip: '竖屏时使用的餐坊布局，可双击预制体调整位置和换图。' })
    public portraitLayout: Prefab | null = null;

    @property({ type: Sprite, tooltip: '主场景背景图，运行时按照画布尺寸铺满。' })
    public backdrop: Sprite | null = null;

    @property({ type: SpriteAtlas, tooltip: '棋盘道具与订单共用的默认道具图集。' })
    public itemAtlas: SpriteAtlas | null = null;

    @property({ type: SpriteAtlas, tooltip: '后续关卡的高阶面点、咖啡和莓果道具图集。' })
    public campaignAtlas: SpriteAtlas | null = null;

    @property({ type: [SpriteFrame], tooltip: '按从面团到烘焙礼篮的阶数顺序覆盖面点图片。' })
    public copperItemFrames: SpriteFrame[] = [];

    @property({ type: [SpriteFrame], tooltip: '按从咖啡豆到咖啡品鉴组的阶数顺序覆盖咖啡图片。' })
    public quartzItemFrames: SpriteFrame[] = [];

    @property({ type: [SpriteFrame], tooltip: '按从草莓到莓果庆典蛋糕的阶数顺序覆盖莓果图片。' })
    public berryItemFrames: SpriteFrame[] = [];

    @property({ tooltip: '保存棋盘、体力、关卡和补货台进度，关闭后每次载入从试营业开始。' })
    public persistProgress = true;

    private state!: AlloyGameState;
    private audio!: AudioSource;
    private audioUnlocked = false;
    private musicRequested = false;
    private muted = false;
    private playfield: AlloyLayout | null = null;
    private portrait?: boolean;
    private selected = -1;
    private gesture: BoardGesture | null = null;
    private restartPending = false;
    private status = '等待补货';
    private energyDisplay = '';

    // 恢复进度或开启新局，并初始化静音的音频通道。
    protected onLoad(): void {
        const now = Date.now();
        const restored = this.loadProgress(now);
        this.state = restored ?? new AlloyGameState(now);
        if (restored) {
            this.status = '已恢复上次的营业进度';
        }
        this.saveProgress();
        const audioNode = new Node('WorkshopAudio');
        audioNode.active = false;
        this.node.addChild(audioNode);
        this.audio = audioNode.addComponent(AudioSource);
        this.audio.playOnAwake = false;
        this.audio.loop = true;
        this.audio.volume = 0.55;
        this.audio.clip = this.musicClip;
        audioNode.active = true;
    }

    // 从当前设备读取存档，兼容空存档、损坏数据和受限的浏览器环境。
    private loadProgress(now: number): AlloyGameState | null {
        if (!this.persistProgress) {
            return null;
        }
        try {
            const contents = sys.localStorage.getItem(PROGRESS_KEY);
            return contents ? AlloyGameState.restore(JSON.parse(contents), now) : null;
        } catch {
            return null;
        }
    }

    // 一次性保存完整进度，设备存储不可用时继续当前局。
    private saveProgress(): void {
        if (!this.persistProgress) {
            return;
        }
        try {
            sys.localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.state.getSnapshot()));
        } catch {
            // 浏览器限制存储时仍可完成当前试玩。
        }
    }

    // 订阅画布尺寸变化并摆放横屏或竖屏界面。
    protected onEnable(): void {
        view.on('canvas-resize', this.layout, this);
        this.layout();
        if (this.playfield) {
            this.playfield.node.active = true;
        }
    }

    // 停止接收尺寸事件，并清理进行中的拖拽和背景音乐。
    protected onDisable(): void {
        view.off('canvas-resize', this.layout, this);
        this.clearGesture();
        if (this.playfield) {
            this.playfield.node.active = false;
        }
        this.musicRequested = false;
        this.audio.stop();
    }

    // 隐藏覆盖操作区的性能统计，并通知 SDK 适配器进入可玩场景。
    protected start(): void {
        profiler?.hideStats();
        this.track({ type: 'game_start' });
    }

    // 更新体力恢复进度，只在显示值变化时刷新界面。
    protected update(): void {
        if (this.playfield) {
            this.refreshEnergy();
        }
    }

    // 根据画布比例装载对应的预制体，并按设计尺寸等比缩放。
    private layout(): void {
        const visible = view.getVisibleSize();
        if (visible.width <= 0 || visible.height <= 0) {
            return;
        }
        if (this.backdrop?.spriteFrame) {
            const aspect = this.backdrop.spriteFrame.originalSize.width / this.backdrop.spriteFrame.originalSize.height;
            const width = Math.max(visible.width, visible.height * aspect);
            this.backdrop.getComponent(UITransform)!.setContentSize(width, width / aspect);
        }
        const portrait = visible.width / visible.height < 1.08;
        if (!this.playfield || this.portrait !== portrait) {
            const prefab = portrait ? this.portraitLayout : this.landscapeLayout;
            if (!prefab) {
                return;
            }
            this.clearGesture();
            if (this.playfield) {
                this.playfield.node.active = false;
                this.playfield.node.destroy();
            }
            const root = instantiate(prefab);
            this.node.addChild(root);
            this.playfield = root.getComponent(AlloyLayout)!;
            this.portrait = portrait;
            this.bindLayout(this.playfield);
            this.energyDisplay = '';
            this.refresh();
        }
        const design = this.playfield.getComponent(UITransform)!.contentSize;
        const scale = Math.min(visible.width / design.width, visible.height / design.height);
        this.playfield.node.setScale(scale, scale, 1);
    }

    // 绑定棋盘、订单、补货台升级和结算弹窗的触摸操作。
    private bindLayout(field: AlloyLayout): void {
        const board = field.board!;
        const bounds = field.tiles.map((tile) => tile.getComponent(UITransform)!.getBoundingBox());
        const left = Math.min(...bounds.map((rect) => rect.xMin)) - 4;
        const right = Math.max(...bounds.map((rect) => rect.xMax)) + 4;
        const bottom = Math.min(...bounds.map((rect) => rect.yMin)) - 4;
        const top = Math.max(...bounds.map((rect) => rect.yMax)) + 4;
        const transform = board.getComponent(UITransform)!;
        transform.setContentSize(right - left, top - bottom);
        transform.setAnchorPoint(-left / (right - left), -bottom / (top - bottom));
        board.on(Node.EventType.TOUCH_START, this.onBoardStart, this);
        board.on(Node.EventType.TOUCH_MOVE, this.onBoardMove, this);
        board.on(Node.EventType.TOUCH_END, this.onBoardEnd, this);
        board.on(Node.EventType.TOUCH_CANCEL, this.onBoardCancel, this);
        field.generateButton!.node.on(Node.EventType.TOUCH_END, this.generate, this);
        field.routeButton!.node.on(Node.EventType.TOUCH_END, this.changeSupplyRoute, this);
        field.upgradeButton!.node.on(Node.EventType.TOUCH_END, this.upgradeGenerator, this);
        field.deliverButton!.node.on(Node.EventType.TOUCH_END, this.deliver, this);
        field.recycleButton!.node.on(Node.EventType.TOUCH_END, this.recycle, this);
        field.muteButton!.node.on(Node.EventType.TOUCH_END, this.toggleMute, this);
        field.restartButton!.node.on(Node.EventType.TOUCH_END, this.openRestart, this);
        field.dialogPrimary!.node.on(Node.EventType.TOUCH_END, this.confirmDialog, this);
        field.dialogSecondary!.node.on(Node.EventType.TOUCH_END, this.chooseDialogSecondary, this);
    }

    // 优先显示检查器绑定的图片，并从基础或关卡图集补齐未覆盖的阶数。
    private paintItem(sprite: Sprite, item: AlloyItem | null): void {
        if (!item) {
            sprite.spriteFrame = null;
            return;
        }
        const overrides = item.family === 'copper' ? this.copperItemFrames
            : item.family === 'quartz' ? this.quartzItemFrames : this.berryItemFrames;
        const name = ALLOY_ITEM_FRAMES[item.family][item.tier - 1];
        sprite.spriteFrame = overrides[item.tier - 1] ?? this.itemAtlas?.getSpriteFrame(name)
            ?? this.campaignAtlas?.getSpriteFrame(name) ?? null;
    }

    // 用底图染色和文字颜色反馈按钮的可用状态。
    private paintControl(button: Sprite, text: string, emphasis: Color | null): void {
        button.color = emphasis ?? COLORS.inactive;
        const label = button.getComponentInChildren(Label)!;
        label.color = emphasis ? COLORS.activeText : COLORS.mutedText;
        label.string = text;
    }

    // 把棋盘、单品或双品订单和当前关卡进度更新到当前预制体。
    private refresh(): void {
        const field = this.playfield!;
        this.paintBoard();
        this.refreshEnergy();
        const { order, orderCount, nextItem, tutorial, roundNumber, roundOrderCount, roundOrderTotal } = this.state;
        this.paintItem(field.orderIcon!, order.item);
        const displayedOrder = this.state.roundComplete ? orderCount : orderCount + 1;
        field.orderLabel!.string = `订单 ${displayedOrder} · ${order.customer}`;
        field.orderItemLabel!.string = getAlloyItemName(order.item);
        field.extraOrderIcon!.node.active = !!order.extraItem;
        field.extraOrderLabel!.node.active = !!order.extraItem;
        if (order.extraItem) {
            this.paintItem(field.extraOrderIcon!, order.extraItem);
            field.extraOrderLabel!.string = getAlloyItemName(order.extraItem);
        }
        field.orderRewardLabel!.string = `+${order.reward} 体力 · +1 印章`;
        const stage = roundNumber <= ALLOY_CHAPTERS.length ? `第 ${roundNumber} 关` : '自由营业';
        field.roundProgress!.string = `${stage} · ${roundOrderCount} / ${roundOrderTotal}`;
        this.paintControl(field.deliverButton!, '交付', this.state.canDeliver() ? COLORS.green : null);
        this.refreshGenerator();
        this.paintItem(field.supplyIcon!, nextItem);
        field.supplyLabel!.string = `下一件  ${getAlloyItemName(nextItem)}`;
        field.guideTitle!.string = tutorial === 'complete' ? this.state.roundTitle : GUIDE[tutorial].title;
        field.guideInstruction!.string = this.state.canSelectSupplyRoute && tutorial === 'complete'
            ? '点线路切换食材，交付赚印章升级。' : GUIDE[tutorial].instruction;
        field.statusLabel!.string = this.status;
        this.paintControl(field.muteButton!, this.muted ? '声音关' : '声音开', null);
        this.refreshDialog();
    }

    // 判断结算或重开确认是否正在占用操作区。
    private get dialogOpen(): boolean {
        return this.restartPending || this.state.roundComplete;
    }

    // 显示关卡结算、剧情通关结果或重开确认。
    private refreshDialog(): void {
        const field = this.playfield!;
        field.roundDialog!.active = this.dialogOpen;
        if (!this.dialogOpen) {
            return;
        }
        const { roundNumber, campaignComplete, roundOrderCount, nextRoundName } = this.state;
        const finale = campaignComplete && roundNumber === ALLOY_CHAPTERS.length;
        field.dialogTitle!.string = this.restartPending ? '重新开局？'
            : finale ? '街角餐坊通关' : `${this.state.roundTitle}完成`;
        field.dialogDetail!.string = this.restartPending
            ? '棋盘、订单和补货台会重置。'
            : `已交付 ${roundOrderCount} 单 · 下一站 ${nextRoundName}`;
        const continueText = roundNumber < ALLOY_CHAPTERS.length ? '进入下一关' : '自由营业';
        this.paintControl(field.dialogPrimary!, this.restartPending ? '确认重开' : continueText,
            this.restartPending ? COLORS.orange : COLORS.green);
        this.paintControl(field.dialogSecondary!, this.restartPending ? '取消' : '重新开局', null);
    }

    // 打开重开确认，当前操作完成后再允许重置。
    private openRestart(): void {
        if (this.gesture || this.restartPending) {
            return;
        }
        this.restartPending = true;
        this.refreshDialog();
    }

    // 取消重开确认，或从结算页进入重开确认。
    private chooseDialogSecondary(): void {
        if (this.restartPending) {
            this.restartPending = false;
            this.refreshDialog();
        } else if (this.state.roundComplete) {
            this.openRestart();
        }
    }

    // 确认重置或前往下一关，并在更新存档后发送对应事件。
    private confirmDialog(): void {
        let event: AlloySdkEvent;
        if (this.restartPending) {
            event = { type: 'game_restarted', previousOrderCount: this.state.orderCount };
            this.state = new AlloyGameState(Date.now());
            this.restartPending = false;
            this.selected = -1;
            this.status = '新的一局开始了';
        } else if (this.state.continueRound()) {
            event = { type: 'round_continued', roundNumber: this.state.roundNumber, orderCount: this.state.orderCount };
            this.selected = -1;
            this.status = this.state.roundNumber === 2 ? '已解锁莓果和定向补货' : '新一轮营业已开启';
        } else {
            return;
        }
        this.unlockAudio();
        this.saveProgress();
        this.refresh();
        this.track(event);
    }

    // 显示补货、线路和升级按钮的当前状态及升级费用。
    private refreshGenerator(): void {
        const field = this.playfield!;
        const {
            generatorLevel, upgradeStamps, nextUpgradeCost, nextUpgradeChapter,
            generatorUpgradeUnlocked, canSelectSupplyRoute, supplyRoute,
        } = this.state;
        const ready = !this.dialogOpen && this.state.energy > 0 && this.state.board.indexOf(null) !== -1;
        field.generatorTitle!.string = `补货台 Lv.${generatorLevel} · ${upgradeStamps} 印章`;
        this.paintControl(field.generateButton!, '补货 −1', ready ? COLORS.orange : null);
        field.routeButton!.node.active = canSelectSupplyRoute;
        this.paintControl(field.routeButton!, `线路 ${ALLOY_ROUTE_LABELS[supplyRoute]}`, COLORS.green);
        const upgradeLabel = nextUpgradeCost === null ? '已满级'
            : generatorUpgradeUnlocked ? `升级 · ${nextUpgradeCost} 印章` : `第 ${nextUpgradeChapter} 关可升级`;
        const canUpgrade = !this.dialogOpen && generatorUpgradeUnlocked && nextUpgradeCost !== null && upgradeStamps >= nextUpgradeCost;
        this.paintControl(field.upgradeButton!, upgradeLabel, canUpgrade ? COLORS.orange : null);
    }

    // 切换定向补货线路，保存选择并更新下一件预览。
    private changeSupplyRoute(): void {
        if (this.dialogOpen || this.gesture) {
            return;
        }
        const route = this.state.cycleSupplyRoute();
        if (!route) {
            return;
        }
        this.unlockAudio();
        this.status = `补货线路 · ${ALLOY_ROUTE_LABELS[route]}`;
        this.saveProgress();
        this.refresh();
        this.track({ type: 'supply_route_changed', route, roundNumber: this.state.roundNumber });
    }

    // 扣除印章提升补货产出，保存等级并通知 SDK。
    private upgradeGenerator(): void {
        if (this.dialogOpen || this.gesture) {
            return;
        }
        const level = this.state.upgradeGenerator();
        if (level === null) {
            this.status = this.state.nextUpgradeCost === null ? '补货台已满级'
                : this.state.generatorUpgradeUnlocked ? '交付订单可获得升级印章' : '推进关卡后可升级补货台';
            this.refresh();
            return;
        }
        this.unlockAudio();
        this.status = level === 2 ? '升级成功 · 每三次产出高一阶'
            : level === 3 ? '升级成功 · 补货从二阶开始' : '升级成功 · 每三次产出三阶道具';
        this.saveProgress();
        this.refresh();
        this.track({ type: 'generator_upgraded', level, roundNumber: this.state.roundNumber, remainingStamps: this.state.upgradeStamps });
    }

    // 更新体力恢复计时和预制体中的体力格。
    private refreshEnergy(): void {
        const now = Date.now();
        this.state.recoverEnergy(now);
        const { energy } = this.state;
        const next = this.state.secondsUntilEnergy(now);
        const display = `体力 ${energy} / ${ENERGY_CAPACITY}   ·   ${next > 0 ? `${next} 秒后 +1` : '已满'}`;
        if (display === this.energyDisplay) {
            return;
        }
        const field = this.playfield!;
        this.energyDisplay = display;
        field.energyLabel!.string = display;
        field.energyPips.forEach((pip, index) => {
            pip.color = index < energy ? COLORS.green : COLORS.inactive;
        });
        this.refreshGenerator();
    }

    // 更新每格道具、可合成目标和教程高亮。
    private paintBoard(): void {
        const field = this.playfield!;
        const { board, tutorial } = this.state;
        const orderCell = tutorial === 'deliver' ? this.state.getOrderCell() : -1;
        const dragging = this.gesture?.dragging ? this.gesture : null;
        for (let index = 0; index < board.length; index += 1) {
            const item = board[index];
            const hovered = dragging?.hover === index;
            const validTarget = !!hovered && dragging.from !== index && (!item || this.state.canMerge(dragging.from, index));
            const tutorialPair = item?.family === 'copper' && item.tier === 1 && tutorial === 'merge';
            const highlight = index === this.selected || validTarget || index === orderCell || tutorialPair;
            const visibleItem = dragging?.from === index ? null : item;
            field.tiles[index].color = hovered && !validTarget ? COLORS.blocked : item ? COLORS.filledTile : COLORS.emptyTile;
            field.focusFrames[index].node.active = highlight;
            this.paintItem(field.items[index], visibleItem);
            field.tiers[index].string = visibleItem ? `T${visibleItem.tier}` : '';
        }
        this.paintControl(field.recycleButton!, '回收', this.state.canRecycle(this.selected) ? COLORS.orange : null);
    }

    // 将触点从画布坐标转换到棋盘节点坐标。
    private getBoardPoint(event: EventTouch): Vec3 {
        const point = event.getUILocation();
        return this.playfield!.board!.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
    }

    // 用预制体格子的实际位置和尺寸判断落点。
    private getCell(point: Vec3): number {
        const location = new Vec2(point.x, point.y);
        return this.playfield!.tiles.findIndex((tile) => tile.getComponent(UITransform)!.getBoundingBox().contains(location));
    }

    // 记录单指棋盘操作的起点，在弹窗和并发触点期间忽略输入。
    private onBoardStart(event: EventTouch): void {
        if (this.gesture || this.dialogOpen) {
            return;
        }
        const point = this.getBoardPoint(event);
        const from = this.getCell(point);
        const touchId = event.getID();
        if (from !== -1 && touchId !== null) {
            this.gesture = { touchId, from, x: point.x, y: point.y, dragging: false, hover: from };
        }
    }

    // 超过拖动阈值后显示物品预览，并更新候选目标。
    private onBoardMove(event: EventTouch): void {
        const gesture = this.gesture;
        if (!gesture || gesture.touchId !== event.getID()) {
            return;
        }
        const item = this.state.board[gesture.from];
        if (!item) {
            return;
        }
        const point = this.getBoardPoint(event);
        const firstDrag = !gesture.dragging;
        if (firstDrag && Math.hypot(point.x - gesture.x, point.y - gesture.y) < 10) {
            return;
        }
        if (firstDrag) {
            gesture.dragging = true;
            this.selected = -1;
            this.playfield!.dragPreview!.node.active = true;
            this.paintItem(this.playfield!.dragPreview!, item);
        }
        this.playfield!.dragPreview!.node.setPosition(point.x, point.y, 0);
        const hover = this.getCell(point);
        if (firstDrag || hover !== gesture.hover) {
            gesture.hover = hover;
            this.paintBoard();
        }
    }

    // 释放时提交拖拽，或用两次点击完成选择和落格。
    private onBoardEnd(event: EventTouch): void {
        const gesture = this.gesture;
        if (!gesture || gesture.touchId !== event.getID()) {
            return;
        }
        const target = this.getCell(this.getBoardPoint(event));
        this.clearGesture();
        if (gesture.dragging) {
            if (target !== -1 && target !== gesture.from) {
                this.drop(gesture.from, target);
            }
        } else if (target === gesture.from) {
            const item = this.state.board[target];
            if (this.selected !== -1 && target !== this.selected && (!item || this.state.canMerge(this.selected, target))) {
                this.drop(this.selected, target);
            } else if (item) {
                this.unlockAudio();
                this.selected = this.selected === target ? -1 : target;
                this.status = this.selected === -1 ? '已取消选择' : `已选中 ${getAlloyItemName(item)}`;
            }
        }
        this.refresh();
    }

    // 触点取消或从棋盘外释放时清理预览，保留原物品。
    private onBoardCancel(event: EventTouch): void {
        if (this.gesture?.touchId === event.getID()) {
            this.clearGesture();
            this.paintBoard();
        }
    }

    // 隐藏跟手物品并释放当前棋盘操作。
    private clearGesture(): void {
        this.gesture = null;
        if (this.playfield?.dragPreview) {
            this.playfield.dragPreview.node.active = false;
        }
    }

    // 提交落格并保存棋盘，合成时播放音效并发送事件。
    private drop(from: number, to: number): void {
        const result = this.state.drop(from, to);
        if (result === 'blocked') {
            this.status = '只能放入空格，或合成同类同阶物品。';
            return;
        }
        this.unlockAudio();
        this.selected = -1;
        const item = this.state.board[to]!;
        this.status = result === 'merge' ? `合成成功 · ${getAlloyItemName(item)}` : '物品已移动';
        this.saveProgress();
        if (result === 'merge') {
            this.playEffect(this.mergeClip);
            this.track({ type: 'item_merged', item: { ...item } });
        }
    }

    // 补货成功后保存进度，并反馈体力不足或棋盘已满的情况。
    private generate(): void {
        if (this.gesture || this.dialogOpen) {
            return;
        }
        const result = this.state.generate(Date.now());
        if (typeof result === 'number') {
            this.unlockAudio();
            this.selected = -1;
            const item = this.state.board[result]!;
            this.status = `补货成功 · ${getAlloyItemName(item)}`;
            this.saveProgress();
            this.playEffect(this.generateClip);
            this.track({ type: 'item_generated', item: { ...item }, energy: this.state.energy });
        } else {
            this.status = result === 'full' ? '棋盘已满，先合成、交付或回收物品。' : '体力不足，请等待恢复。';
        }
        this.refresh();
    }

    // 一次性交付订单的全部物品，保存奖励并发送结算或通关事件。
    private deliver(): void {
        if (this.gesture || this.dialogOpen) {
            return;
        }
        const tutorialWasActive = this.state.tutorial !== 'complete';
        const completed = this.state.deliver(Date.now());
        if (completed) {
            this.unlockAudio();
            this.selected = -1;
            this.status = tutorialWasActive ? '新手引导完成 · 下一张订单已到达' : `已交付 · +${completed.reward} 体力 · +1 印章`;
            this.saveProgress();
            this.playEffect(this.orderClip);
            this.track({
                type: 'order_delivered', orderCount: this.state.orderCount, item: { ...completed.item },
                ...(completed.extraItem ? { extraItem: { ...completed.extraItem } } : {}),
            });
            if (tutorialWasActive) {
                this.track({ type: 'tutorial_completed' });
            }
            if (this.state.roundComplete) {
                this.track({ type: 'round_completed', roundNumber: this.state.roundNumber, orderCount: this.state.orderCount });
                if (this.state.roundNumber === ALLOY_CHAPTERS.length) {
                    this.track({ type: 'campaign_completed', roundNumber: this.state.roundNumber, orderCount: this.state.orderCount });
                }
            }
        } else {
            const { item, extraItem } = this.state.order;
            this.status = extraItem ? '棋盘上需要同时备齐两件物品。' : `还需要 ${getAlloyItemName(item)}`;
        }
        this.refresh();
    }

    // 回收选中的道具并保存棋盘，在教程中提示可回收的条件。
    private recycle(): void {
        if (this.gesture || this.dialogOpen) {
            return;
        }
        if (this.state.recycle(this.selected)) {
            this.unlockAudio();
            this.selected = -1;
            this.status = '物品已回收';
            this.saveProgress();
        } else {
            this.status = this.state.tutorial === 'complete' || this.state.board.indexOf(null) === -1
                ? '先点选要回收的物品。'
                : '完成首单或棋盘填满后可回收。';
        }
        this.refresh();
    }

    // 切换音乐和音效，关闭声音时立即暂停背景音乐。
    private toggleMute(): void {
        this.muted = !this.muted;
        if (this.muted) {
            this.musicRequested = false;
            this.audio.pause();
        } else {
            this.unlockAudio();
        }
        this.paintControl(this.playfield!.muteButton!, this.muted ? '声音关' : '声音开', null);
    }

    // 只在有效点击或触摸的回调中开启音频并同步启动音乐。
    private unlockAudio(): void {
        this.audioUnlocked = true;
        if (!this.muted && this.musicClip && !this.musicRequested) {
            this.musicRequested = true;
            this.audio.play();
        }
    }

    // 在音频已解锁且未静音时播放检查器绑定的音效。
    private playEffect(clip: AudioClip | null): void {
        if (this.audioUnlocked && !this.muted && clip) {
            this.audio.playOneShot(clip, 0.8);
        }
    }

    // 转发可选的 SDK 事件，隔离平台回调错误与玩法流程。
    private track(event: AlloySdkEvent): void {
        try {
            this.sdkAdapter?.trackEvent(event);
        } catch (error) {
            console.warn('[AlloyGame] SDK 事件发送失败', event.type, error);
        }
    }
}
