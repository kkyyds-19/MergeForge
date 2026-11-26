import {
    _decorator, AudioClip, AudioSource, Color, Component, EventTouch, Graphics, Label, Node, profiler, UITransform, Vec3, view,
} from 'cc';
import {
    ALLOY_COLORS, createAlloyLabel, createAlloyNode, createAlloyPlate, paintAlloyItem, paintAlloyPlate,
} from './AlloyArt';
import type { AlloyPlate } from './AlloyArt';
import { AlloyGameState, BOARD_COLUMNS, BOARD_ROWS, ENERGY_CAPACITY, getAlloyItemName } from './AlloyGameState';
import type { AlloyItem, AlloyTutorialStep } from './AlloyGameState';
import { AlloySdkAdapter } from './AlloySdkAdapter';
import type { AlloySdkEvent } from './AlloySdkAdapter';

const { ccclass, property } = _decorator;
const C = ALLOY_COLORS;
const CENTER = Label.HorizontalAlign.CENTER;
const CELL_SIZE = 82;
const CELL_STEP = 88;
const GUIDE: Record<AlloyTutorialStep, { title: string; instruction: string }> = {
    generate: { title: '1 / 3   采集矿物', instruction: '点击右侧或下方高亮的采集按钮。' },
    merge: { title: '2 / 3   合成铜锭', instruction: '将一块铜矿拖到另一块铜矿上。' },
    deliver: { title: '3 / 3   交付订单', instruction: '点击交付，提交铜锭并领取体力。' },
    complete: { title: '工坊操作', instruction: '同类同阶可合成，点选多余物品可回收。' },
};

interface CellView {
    readonly plate: AlloyPlate;
    readonly icon: Graphics;
    readonly tier: Label;
}

interface ControlView {
    readonly plate: AlloyPlate;
    readonly label: Label;
    readonly width: number;
    readonly height: number;
}

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

    @property({ type: AudioClip, tooltip: '成功采集矿物时播放的音效。' })
    public generateClip: AudioClip | null = null;

    @property({ type: AudioClip, tooltip: '两件物品成功合成时播放的音效。' })
    public mergeClip: AudioClip | null = null;

    @property({ type: AudioClip, tooltip: '成功交付订单并领取奖励时播放的音效。' })
    public orderClip: AudioClip | null = null;

    @property({ type: AlloySdkAdapter, tooltip: '供试玩广告平台接收玩法事件的 SDK 适配组件。' })
    public sdkAdapter: AlloySdkAdapter | null = null;

    private state!: AlloyGameState;
    private audio!: AudioSource;
    private audioUnlocked = false;
    private musicRequested = false;
    private muted = false;
    private content?: Node;
    private backdrop?: Graphics;
    private portrait?: boolean;
    private boardNode!: Node;
    private cells: CellView[] = [];
    private selected = -1;
    private gesture: BoardGesture | null = null;
    private ghost!: AlloyPlate;
    private ghostIcon!: Graphics;
    private energyLabel!: Label;
    private energyMeter!: Graphics;
    private orderLabel!: Label;
    private orderItemLabel!: Label;
    private orderRewardLabel!: Label;
    private orderIcon!: Graphics;
    private supplyLabel!: Label;
    private supplyIcon!: Graphics;
    private guideTitle!: Label;
    private guideInstruction!: Label;
    private statusLabel!: Label;
    private deliverControl!: ControlView;
    private generateControl!: ControlView;
    private recycleControl!: ControlView;
    private muteControl!: ControlView;
    private status = '等待采集';
    private energyDisplay = '';

    // 初始化棋盘和音频通道，确保载入时没有任何自动播放。
    protected onLoad(): void {
        this.state = new AlloyGameState(Date.now());
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

    // 订阅画布尺寸变化并摆放横屏或竖屏界面。
    protected onEnable(): void {
        view.on('canvas-resize', this.layout, this);
        this.layout();
        if (this.content) {
            this.content.active = true;
        }
    }

    // 停止接收尺寸事件，并清理进行中的拖拽和背景音乐。
    protected onDisable(): void {
        view.off('canvas-resize', this.layout, this);
        this.clearGesture();
        if (this.content) {
            this.content.active = false;
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
        if (this.content) {
            this.refreshEnergy();
        }
    }

    // 按可用视口选择布局，缩放整套控件并重绘背景。
    private layout(): void {
        const visible = view.getVisibleSize();
        if (visible.width <= 0 || visible.height <= 0) {
            return;
        }
        const portrait = visible.width / visible.height < 1.08;
        const width = portrait ? 620 : 1160;
        const height = portrait ? 1090 : 688;
        if (!this.backdrop) {
            this.backdrop = createAlloyNode(this.node, 'Backdrop', 0, 0, 0, 0).addComponent(Graphics);
        }
        this.backdrop.clear();
        this.backdrop.fillColor = Color.fromHEX(new Color(), C.background);
        this.backdrop.rect(-visible.width / 2, -visible.height / 2, visible.width, visible.height);
        this.backdrop.fill();
        if (!this.content || this.portrait !== portrait) {
            this.clearGesture();
            if (this.content) {
                this.content.active = false;
                this.content.destroy();
            }
            this.content = createAlloyNode(this.node, 'AlloyPlayfield', 0, 0, width, height);
            this.portrait = portrait;
            this.buildHud(this.content, portrait);
            this.buildBoard(this.content, portrait);
            this.buildOrder(this.content, portrait);
            this.buildGenerator(this.content, portrait);
            this.buildGuide(this.content, portrait);
            this.refresh();
        }
        const scale = Math.min(visible.width / width, visible.height / height);
        this.content.setScale(scale, scale, 1);
    }

    // 创建标题、体力读数和音频开关。
    private buildHud(parent: Node, portrait: boolean): void {
        const titleX = portrait ? -86 : -326;
        const topY = portrait ? 497 : 292;
        createAlloyLabel(parent, 'Title', '晶核工坊', titleX, topY, 426, 58, 46, C.text, undefined, true);
        createAlloyLabel(parent, 'Subtitle', '采集矿物 · 合成晶核 · 完成委托', titleX, topY - 40, 426, 26, 19, C.secondary);
        const energy = createAlloyPlate(parent, 'EnergyCard', portrait ? -95 : 238, portrait ? 405 : 285, 405, 62, C.panel, C.border);
        this.energyLabel = createAlloyLabel(energy.node, 'EnergyValue', '', 0, 11, 365, 25, 18, C.aqua);
        this.energyMeter = createAlloyNode(energy.node, 'EnergyMeter', 0, -14, 365, 10).addComponent(Graphics);
        this.energyDisplay = '';
        this.muteControl = this.makeControl(parent, 'AudioToggle', portrait ? 225 : 509, topY, 110, 44, this.toggleMute);
    }

    // 构建棋盘格、物品图标、回收操作和跟手预览。
    private buildBoard(parent: Node, portrait: boolean): void {
        const panel = createAlloyPlate(parent, 'BoardCard', portrait ? 0 : -258, portrait ? 112 : -44,
            594, portrait ? 502 : 550, C.panel, C.border, 22);
        const titleY = portrait ? 220 : 236;
        createAlloyLabel(panel.node, 'BoardTitle', '合成棋盘', -132, titleY, 258, 37, 27, C.text, undefined, true);
        this.recycleControl = this.makeControl(panel.node, 'Recycle', 219, titleY, 114, 36, this.recycle);
        this.boardNode = createAlloyNode(panel.node, 'BoardInput', 0, portrait ? -23 : -13,
            BOARD_COLUMNS * CELL_STEP, BOARD_ROWS * CELL_STEP);
        this.boardNode.on(Node.EventType.TOUCH_START, this.onBoardStart, this);
        this.boardNode.on(Node.EventType.TOUCH_MOVE, this.onBoardMove, this);
        this.boardNode.on(Node.EventType.TOUCH_END, this.onBoardEnd, this);
        this.boardNode.on(Node.EventType.TOUCH_CANCEL, this.onBoardCancel, this);
        this.cells = [];
        for (let row = 0; row < BOARD_ROWS; row += 1) {
            for (let column = 0; column < BOARD_COLUMNS; column += 1) {
                const index = row * BOARD_COLUMNS + column;
                const x = (column - (BOARD_COLUMNS - 1) / 2) * CELL_STEP;
                const y = ((BOARD_ROWS - 1) / 2 - row) * CELL_STEP;
                const plate = createAlloyPlate(this.boardNode, `Cell-${index}`, x, y, CELL_SIZE, CELL_SIZE, C.inset, C.border, 13);
                const icon = createAlloyNode(plate.node, 'Item', 0, 3, 56, 56).addComponent(Graphics);
                const tier = createAlloyLabel(plate.node, 'Tier', '', 0, -28, 76, 19, 13, C.secondary, CENTER);
                this.cells.push({ plate, icon, tier });
            }
        }
        this.ghost = createAlloyPlate(this.boardNode, 'DragPreview', 0, 0, CELL_SIZE, CELL_SIZE, C.panel, C.aqua, 13);
        this.ghostIcon = createAlloyNode(this.ghost.node, 'DragItem', 0, 0, 64, 64).addComponent(Graphics);
        this.ghost.node.active = false;
    }

    // 构建当前客户、所需物品、体力奖励及交付按钮。
    private buildOrder(parent: Node, portrait: boolean): void {
        const width = portrait ? 594 : 466;
        const card = createAlloyPlate(parent, 'OrderCard', portrait ? 0 : 286, portrait ? -222 : 144,
            width, portrait ? 138 : 174, C.panel, C.border, 22);
        const left = -width / 2;
        const icon = createAlloyPlate(card.node, 'OrderItemPlate', left + 57, portrait ? -6 : -10, 68, 68, C.inset, C.border, 14);
        this.orderIcon = createAlloyNode(icon.node, 'OrderItem', 0, 0, 56, 56).addComponent(Graphics);
        this.orderLabel = createAlloyLabel(card.node, 'OrderCustomer', '', left + 181, portrait ? 45 : 58, 322, 30, 21, C.text, undefined, true);
        this.orderItemLabel = createAlloyLabel(card.node, 'OrderRequirement', '', left + 206, portrait ? 10 : 11, 204, 30, 24, C.text, undefined, true);
        this.orderRewardLabel = createAlloyLabel(card.node, 'OrderReward', '', left + 204, -26, 200, 26, 17, C.orange);
        this.deliverControl = this.makeControl(card.node, 'Deliver', width / 2 - 87, portrait ? -15 : -13, 132, 49, this.deliver);
    }

    // 构建采集台、下一种矿物提示和采集按钮。
    private buildGenerator(parent: Node, portrait: boolean): void {
        const width = portrait ? 594 : 466;
        const card = createAlloyPlate(parent, 'GeneratorCard', portrait ? 0 : 286, portrait ? -360 : -28,
            width, portrait ? 113 : 145, C.panel, C.border, 22);
        const left = -width / 2;
        const icon = createAlloyPlate(card.node, 'SupplyItemPlate', left + 57, 0, 68, 68, C.inset, C.border, 14);
        this.supplyIcon = createAlloyNode(icon.node, 'SupplyItem', 0, 0, 56, 56).addComponent(Graphics);
        createAlloyLabel(card.node, 'GeneratorTitle', '矿物采集台', left + 200, 17, 192, 32, 23, C.text, undefined, true);
        this.supplyLabel = createAlloyLabel(card.node, 'GeneratorNext', '', left + 200, -17, 192, 25, 17, C.secondary);
        this.generateControl = this.makeControl(card.node, 'Generate', width / 2 - 87, 0, 132, 49, this.generate);
    }

    // 建立引导标题、当前操作说明和反馈提示区。
    private buildGuide(parent: Node, portrait: boolean): void {
        const width = portrait ? 594 : 466;
        const card = createAlloyPlate(parent, 'GuideCard', portrait ? 0 : 286, portrait ? -482 : -202,
            width, portrait ? 105 : 168, C.panel, C.border, 22);
        this.guideTitle = createAlloyLabel(card.node, 'GuideStep', '', 0, portrait ? 31 : 48, width - 46, 32, 22, C.aqua, undefined, true);
        this.guideInstruction = createAlloyLabel(card.node, 'GuideInstruction', '', 0,
            portrait ? 0 : 8, width - 46, 31, 19, C.text);
        this.statusLabel = createAlloyLabel(card.node, 'Feedback', '', 0, portrait ? -31 : -43, width - 46, 28, 17, C.secondary);
    }

    // 创建仅在手指或鼠标在按钮内释放时触发的控件。
    private makeControl(
        parent: Node, name: string, x: number, y: number, width: number, height: number, action: () => void,
    ): ControlView {
        const plate = createAlloyPlate(parent, name, x, y, width, height, C.inset, C.border, 12);
        plate.node.on(Node.EventType.TOUCH_END, action, this);
        const label = createAlloyLabel(plate.node, 'Caption', '', 0, 0, width - 10, height - 4, 19, C.text, CENTER, true);
        return { plate, label, width, height };
    }

    // 根据操作可用性与高亮色更新按钮样式。
    private paintControl(control: ControlView, text: string, emphasis: string | null): void {
        paintAlloyPlate(control.plate.graphics, control.width, control.height, emphasis ?? C.inset, emphasis ?? C.border, 12);
        control.label.color = Color.fromHEX(new Color(), emphasis ? C.darkText : C.secondary);
        control.label.string = text;
    }

    // 重绘资源、订单和引导提示，展示最新的玩法状态。
    private refresh(): void {
        this.paintBoard();
        this.refreshEnergy();
        const { order, orderCount, nextFamily, tutorial } = this.state;
        paintAlloyItem(this.orderIcon, order.item);
        this.orderLabel.string = `订单 ${orderCount + 1} · ${order.customer}`;
        this.orderItemLabel.string = getAlloyItemName(order.item);
        this.orderRewardLabel.string = `奖励 +${order.reward} 体力`;
        this.paintControl(this.deliverControl, '交付', this.state.canDeliver() ? C.aqua : null);
        this.refreshGenerator();
        const supply: AlloyItem = { family: nextFamily, tier: 1 };
        paintAlloyItem(this.supplyIcon, supply);
        this.supplyLabel.string = `下一件  ${getAlloyItemName(supply)}`;
        this.guideTitle.string = GUIDE[tutorial].title;
        this.guideInstruction.string = GUIDE[tutorial].instruction;
        this.statusLabel.string = this.status;
        this.paintControl(this.muteControl, this.muted ? '声音关' : '声音开', null);
    }

    // 根据体力和空格情况刷新采集按钮。
    private refreshGenerator(): void {
        const ready = this.state.energy > 0 && this.state.board.indexOf(null) !== -1;
        this.paintControl(this.generateControl, '采集 −1', ready ? C.orange : null);
    }

    // 更新体力恢复计时，并仅在读数变化时重绘体力条。
    private refreshEnergy(): void {
        const now = Date.now();
        this.state.recoverEnergy(now);
        const { energy } = this.state;
        const next = this.state.secondsUntilEnergy(now);
        const display = `体力 ${energy} / ${ENERGY_CAPACITY}   ·   ${next > 0 ? `${next} 秒后 +1` : '已满'}`;
        if (display === this.energyDisplay) {
            return;
        }
        this.energyDisplay = display;
        this.energyLabel.string = display;
        this.energyMeter.clear();
        for (let index = 0; index < ENERGY_CAPACITY; index += 1) {
            this.energyMeter.fillColor = Color.fromHEX(new Color(), index < energy ? C.aqua : C.border);
            this.energyMeter.roundRect(-182 + index * 30.5, -3.5, 26, 7, 3);
            this.energyMeter.fill();
        }
        this.refreshGenerator();
    }

    // 更新物品剪影、选中状态、合成目标和引导边框。
    private paintBoard(): void {
        const { board, tutorial } = this.state;
        const orderCell = tutorial === 'deliver' ? this.state.getOrderCell() : -1;
        for (let index = 0; index < board.length; index += 1) {
            const item = board[index];
            const cell = this.cells[index];
            const dragging = this.gesture?.dragging ? this.gesture : null;
            const hovered = dragging?.hover === index;
            const validTarget = !!hovered && dragging.from !== index && (!item || this.state.canMerge(dragging.from, index));
            const tutorialPair = item?.family === 'copper' && item.tier === 1 && tutorial === 'merge';
            const highlight = index === this.selected || validTarget || index === orderCell || tutorialPair;
            const visibleItem = dragging?.from === index ? null : item;
            paintAlloyPlate(cell.plate.graphics, CELL_SIZE, CELL_SIZE, highlight ? '#24364A' : item ? '#202F40' : C.inset,
                highlight ? C.aqua : hovered ? C.orange : C.border, 13);
            paintAlloyItem(cell.icon, visibleItem);
            cell.tier.string = visibleItem ? `T${visibleItem.tier}` : '';
        }
        const canRecycle = this.selected !== -1 && tutorial === 'complete';
        this.paintControl(this.recycleControl, '回收', canRecycle ? C.orange : null);
    }

    // 将触点的 UI 坐标换算为棋盘局部坐标。
    private getBoardPoint(event: EventTouch): Vec3 {
        const point = event.getUILocation();
        return this.boardNode.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
    }

    // 按棋盘坐标返回格子索引，格子之间的缝隙不参与落点判定。
    private getCell(point: Vec3): number {
        const colX = point.x + BOARD_COLUMNS * CELL_STEP / 2;
        const rowY = BOARD_ROWS * CELL_STEP / 2 - point.y;
        const column = Math.floor(colX / CELL_STEP);
        const row = Math.floor(rowY / CELL_STEP);
        if (column < 0 || column >= BOARD_COLUMNS || row < 0 || row >= BOARD_ROWS) {
            return -1;
        }
        const margin = (CELL_STEP - CELL_SIZE) / 2;
        const x = colX - column * CELL_STEP;
        const y = rowY - row * CELL_STEP;
        return Math.min(x, y, CELL_STEP - x, CELL_STEP - y) >= margin ? row * BOARD_COLUMNS + column : -1;
    }

    // 记录单指棋盘操作的起点，忽略并发触点。
    private onBoardStart(event: EventTouch): void {
        if (this.gesture) {
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
            this.ghost.node.active = true;
            paintAlloyItem(this.ghostIcon, item);
        }
        this.ghost.node.setPosition(point.x, point.y, 0);
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
        if (this.ghost) {
            this.ghost.node.active = false;
        }
    }

    // 提交落格并按移动或合成结果提示玩家。
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
        if (result === 'merge') {
            this.playEffect(this.mergeClip);
            this.track({ type: 'item_merged', item: { ...item } });
        }
    }

    // 尝试采集矿物并反馈体力不足或棋盘已满的情况。
    private generate(): void {
        if (this.gesture) {
            return;
        }
        const result = this.state.generate(Date.now());
        if (typeof result === 'number') {
            this.unlockAudio();
            this.selected = -1;
            const item = this.state.board[result]!;
            this.status = `采集成功 · ${getAlloyItemName(item)}`;
            this.playEffect(this.generateClip);
            this.track({ type: 'item_generated', item: { ...item }, energy: this.state.energy });
        } else {
            this.status = result === 'full' ? '棋盘已满，先合成、交付或回收物品。' : '体力不足，请等待恢复。';
        }
        this.refresh();
    }

    // 交付满足要求的物品并推进订单和新手引导。
    private deliver(): void {
        if (this.gesture) {
            return;
        }
        const tutorialWasActive = this.state.tutorial !== 'complete';
        const completed = this.state.deliver(Date.now());
        if (completed) {
            this.unlockAudio();
            this.selected = -1;
            this.status = tutorialWasActive ? '新手引导完成 · 下一张订单已到达' : `已交付 · +${completed.reward} 体力`;
            this.playEffect(this.orderClip);
            this.track({ type: 'order_delivered', orderCount: this.state.orderCount, item: { ...completed.item } });
            if (tutorialWasActive) {
                this.track({ type: 'tutorial_completed' });
            }
        } else {
            this.status = `还需要 ${getAlloyItemName(this.state.order.item)}`;
        }
        this.refresh();
    }

    // 清除一个选中的多余物品并更新棋盘。
    private recycle(): void {
        if (this.gesture) {
            return;
        }
        if (this.state.recycle(this.selected)) {
            this.unlockAudio();
            this.selected = -1;
            this.status = '物品已回收';
        } else {
            this.status = this.state.tutorial === 'complete' ? '先点选要回收的物品。' : '完成新手引导后可回收。';
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
        this.paintControl(this.muteControl, this.muted ? '声音关' : '声音开', null);
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
