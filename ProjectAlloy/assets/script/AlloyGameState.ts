export const BOARD_COLUMNS = 5;
export const BOARD_ROWS = 5;
export const ENERGY_CAPACITY = 12;
export const ENERGY_INTERVAL_MS = 5000;
export const MAX_ITEM_TIER = 3;

export const ALLOY_ITEMS = {
    copper: ['铜矿', '铜锭', '跃迁核心'],
    quartz: ['石英碎片', '石英棱柱', '谐振核心'],
} as const;

export type AlloyFamily = keyof typeof ALLOY_ITEMS;

export interface AlloyItem {
    readonly family: AlloyFamily;
    readonly tier: number;
}

export interface AlloyOrder {
    readonly customer: string;
    readonly item: AlloyItem;
    readonly reward: number;
}

export type AlloyTutorialStep = 'generate' | 'merge' | 'deliver' | 'complete';
export type AlloyDropResult = 'move' | 'merge' | 'blocked';

const ORDERS: readonly AlloyOrder[] = [
    { customer: '轨道维修站', item: { family: 'copper', tier: 2 }, reward: 3 },
    { customer: '极地观测站', item: { family: 'quartz', tier: 2 }, reward: 4 },
    { customer: '航标工程队', item: { family: 'copper', tier: 3 }, reward: 6 },
    { customer: '峡谷通讯站', item: { family: 'quartz', tier: 3 }, reward: 6 },
];

const GENERATOR_PATTERN: readonly AlloyFamily[] = ['copper', 'copper', 'quartz', 'copper', 'quartz'];
const FIRST_ITEM_CELL = 11;

export class AlloyGameState {
    private readonly cells: (AlloyItem | null)[] = Array.from(
        { length: BOARD_COLUMNS * BOARD_ROWS },
        () => null,
    );
    private generatedCount = 0;
    private nextEnergyAtMs: number | null = null;
    private currentEnergy = 8;
    private fulfilledOrders = 0;
    private currentTutorial: AlloyTutorialStep = 'generate';

    // 放入第一块教程矿石并启动体力恢复计时。
    public constructor(nowMs: number) {
        this.cells[FIRST_ITEM_CELL] = { family: 'copper', tier: 1 };
        this.nextEnergyAtMs = nowMs + ENERGY_INTERVAL_MS;
    }

    // 提供当前棋盘格内容供界面绘制。
    public get board(): readonly (AlloyItem | null)[] {
        return this.cells;
    }

    // 返回当前可用体力。
    public get energy(): number {
        return this.currentEnergy;
    }

    // 返回已经交付的订单数量。
    public get orderCount(): number {
        return this.fulfilledOrders;
    }

    // 根据交付进度从订单队列取出当前订单。
    public get order(): AlloyOrder {
        return ORDERS[this.fulfilledOrders % ORDERS.length];
    }

    // 返回下一次采集会生成的矿物类型。
    public get nextFamily(): AlloyFamily {
        return GENERATOR_PATTERN[this.generatedCount % GENERATOR_PATTERN.length];
    }

    // 返回当前新手引导步骤。
    public get tutorial(): AlloyTutorialStep {
        return this.currentTutorial;
    }

    // 按经过的时间恢复体力，满体力时停止计时。
    public recoverEnergy(nowMs: number): void {
        if (this.nextEnergyAtMs === null || nowMs < this.nextEnergyAtMs) {
            return;
        }
        const recovered = 1 + Math.floor((nowMs - this.nextEnergyAtMs) / ENERGY_INTERVAL_MS);
        this.currentEnergy = Math.min(ENERGY_CAPACITY, this.currentEnergy + recovered);
        this.nextEnergyAtMs = this.currentEnergy === ENERGY_CAPACITY
            ? null
            : this.nextEnergyAtMs + recovered * ENERGY_INTERVAL_MS;
    }

    // 计算距下一点体力恢复还剩几秒。
    public secondsUntilEnergy(nowMs: number): number {
        return this.nextEnergyAtMs === null ? 0 : Math.max(0, Math.ceil((this.nextEnergyAtMs - nowMs) / 1000));
    }

    // 在首个空格生成矿物，成功后扣除一点体力。
    public generate(nowMs: number): number | 'noEnergy' | 'full' {
        this.recoverEnergy(nowMs);
        const cell = this.cells.indexOf(null);
        if (cell === -1) {
            return 'full';
        }
        if (this.currentEnergy === 0) {
            return 'noEnergy';
        }
        this.cells[cell] = { family: this.nextFamily, tier: 1 };
        this.generatedCount += 1;
        this.currentEnergy -= 1;
        if (this.nextEnergyAtMs === null) {
            this.nextEnergyAtMs = nowMs + ENERGY_INTERVAL_MS;
        }
        if (this.currentTutorial === 'generate') {
            this.currentTutorial = 'merge';
        }
        return cell;
    }

    // 将物品移入空格或把两件同类同阶物品合成为高一阶物品。
    public drop(from: number, to: number): AlloyDropResult {
        const source = this.cells[from];
        if (!this.isCell(from) || !this.isCell(to) || from === to || !source) {
            return 'blocked';
        }
        const target = this.cells[to];
        if (target && !this.canMerge(from, to)) {
            return 'blocked';
        }
        this.cells[from] = null;
        this.cells[to] = target ? { family: source.family, tier: source.tier + 1 } : source;
        if (target && this.currentTutorial === 'merge' && this.canDeliver()) {
            this.currentTutorial = 'deliver';
        }
        return target ? 'merge' : 'move';
    }

    // 判断两个不同格子里的物品能否合成。
    public canMerge(from: number, to: number): boolean {
        const source = this.cells[from];
        const target = this.cells[to];
        return from !== to && !!source && !!target && source.family === target.family
            && source.tier === target.tier && source.tier < MAX_ITEM_TIER;
    }

    // 查找一件符合当前订单要求的物品。
    public getOrderCell(): number {
        const required = this.order.item;
        return this.cells.findIndex((item) => item?.family === required.family && item.tier === required.tier);
    }

    // 判断当前棋盘能否交付订单。
    public canDeliver(): boolean {
        return this.getOrderCell() !== -1;
    }

    // 消耗所需物品、发放体力奖励并切换到下一张订单。
    public deliver(nowMs: number): AlloyOrder | null {
        const cell = this.getOrderCell();
        if (cell === -1) {
            return null;
        }
        this.recoverEnergy(nowMs);
        const completedOrder = this.order;
        this.cells[cell] = null;
        this.fulfilledOrders += 1;
        this.currentEnergy = Math.min(ENERGY_CAPACITY, this.currentEnergy + completedOrder.reward);
        if (this.currentEnergy === ENERGY_CAPACITY) {
            this.nextEnergyAtMs = null;
        }
        this.currentTutorial = 'complete';
        return completedOrder;
    }

    // 在教程完成后回收多余物品，给采集腾出空格。
    public recycle(cell: number): boolean {
        if (this.currentTutorial !== 'complete' || !this.isCell(cell) || !this.cells[cell]) {
            return false;
        }
        this.cells[cell] = null;
        return true;
    }

    // 确认索引是棋盘上的有效整数格。
    private isCell(index: number): boolean {
        return Number.isInteger(index) && index >= 0 && index < this.cells.length;
    }
}

// 根据物品的系列和阶段返回界面使用的名称。
export function getAlloyItemName(item: AlloyItem): string {
    return ALLOY_ITEMS[item.family][item.tier - 1];
}
