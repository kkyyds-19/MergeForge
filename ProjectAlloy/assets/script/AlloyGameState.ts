import {
    ALLOY_CHAPTERS, ALLOY_FAMILIES, ALLOY_FREE_PLAY_ORDER_COUNT,
    ALLOY_GENERATOR_LEVELS, ALLOY_ITEMS, ALLOY_SUPPLY_ROUTES,
} from './AlloyCampaign';
import type { AlloyFamily, AlloyItem, AlloyOrder, AlloySupplyRoute } from './AlloyCampaign';
import * as AlloyBoardSystem from './ecs/AlloyBoardSystem';
import type { AlloyDropResult } from './ecs/AlloyBoardSystem';
import * as AlloyEnergySystem from './ecs/AlloyEnergySystem';
import { ENERGY_CAPACITY, ENERGY_INTERVAL_MS } from './ecs/AlloyEnergySystem';
import * as AlloyOrderSystem from './ecs/AlloyOrderSystem';
import * as AlloySupplySystem from './ecs/AlloySupplySystem';
import { AlloyWorld, BOARD_COLUMNS, BOARD_ROWS } from './ecs/AlloyWorld';
import type { AlloyTutorialStep } from './ecs/AlloyWorld';

export type { AlloyFamily, AlloyItem, AlloyOrder, AlloySupplyRoute } from './AlloyCampaign';
export { ALLOY_ITEMS, getAlloyItemName } from './AlloyCampaign';
export type { AlloyDropResult } from './ecs/AlloyBoardSystem';
export { ENERGY_CAPACITY, ENERGY_INTERVAL_MS } from './ecs/AlloyEnergySystem';
export { BOARD_COLUMNS, BOARD_ROWS } from './ecs/AlloyWorld';
export type { AlloyTutorialStep } from './ecs/AlloyWorld';
export const MAX_ITEM_TIER = Math.max(...ALLOY_FAMILIES.map((family) => ALLOY_ITEMS[family].length));

export interface AlloyProgressSnapshot {
    readonly version: 2;
    readonly cells: readonly (AlloyItem | null)[];
    readonly generatedCount: number;
    readonly nextEnergyAtMs: number | null;
    readonly energy: number;
    readonly fulfilledOrders: number;
    readonly roundNumber: number;
    readonly roundOrderCount: number;
    readonly generatorLevel: number;
    readonly upgradeStamps: number;
    readonly supplyRoute: AlloySupplyRoute;
    readonly tutorial: AlloyTutorialStep;
}

export const ORDERS_PER_ROUND = ALLOY_CHAPTERS[0].orders.length;

const FIRST_ITEM_CELL = 11;

// 判断存档里的数字能否安全地作为非负整数计数。
function isProgressCount(value: unknown): value is number {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

// 检查单格存档是否为空格，或包含受支持的系列与等级。
function isSavedCell(value: unknown): value is AlloyItem | null {
    if (value === null) {
        return true;
    }
    if (typeof value !== 'object' || !value) {
        return false;
    }
    const { family, tier } = value as Partial<AlloyItem>;
    return (family === 'copper' || family === 'quartz' || family === 'berry')
        && isProgressCount(tier) && tier >= 1 && tier <= ALLOY_ITEMS[family].length;
}

export class AlloyGameState {
    private readonly world = new AlloyWorld();

    // 初始化独立的玩法世界，放入教程道具并启动体力恢复。
    public constructor(nowMs: number) {
        this.world.setItem(FIRST_ITEM_CELL, { family: 'copper', tier: 1 });
        this.world.session.energy.nextRecoveryAtMs = nowMs + ENERGY_INTERVAL_MS;
    }

    // 校验并迁移存档，把字段恢复到玩法世界的对应组件。
    public static restore(value: unknown, nowMs: number): AlloyGameState | null {
        if (typeof value !== 'object' || !value) {
            return null;
        }
        const snapshot = value as Partial<Omit<AlloyProgressSnapshot, 'version'> & { version: number; settledRounds: number }>;
        const { cells, generatedCount, nextEnergyAtMs, energy, fulfilledOrders, tutorial } = snapshot;
        if ((snapshot.version !== 1 && snapshot.version !== 2) || !Array.isArray(cells) || cells.length !== BOARD_COLUMNS * BOARD_ROWS
            || !Array.from(cells).every(isSavedCell) || !isProgressCount(generatedCount) || !isProgressCount(energy)
            || energy > ENERGY_CAPACITY || !isProgressCount(fulfilledOrders)
            || !(tutorial === 'generate' || tutorial === 'merge' || tutorial === 'deliver' || tutorial === 'complete')
            || (energy === ENERGY_CAPACITY ? nextEnergyAtMs !== null : !isProgressCount(nextEnergyAtMs))
            || (tutorial === 'complete') !== (fulfilledOrders > 0)
            || (tutorial === 'generate') !== (generatedCount === 0)) {
            return null;
        }
        const state = new AlloyGameState(nowMs);
        const { world } = state;
        const session = world.session;
        cells.forEach((item, index) => { world.setItem(index, item ? { ...item } : null); });
        session.generator.count = generatedCount;
        session.energy.amount = energy;
        session.energy.nextRecoveryAtMs = nextEnergyAtMs === null
            ? null
            : Math.min(nextEnergyAtMs!, nowMs + ENERGY_INTERVAL_MS);
        session.progress.deliveredTotal = fulfilledOrders;
        session.tutorial.step = tutorial;
        if (snapshot.version === 1) {
            const { settledRounds } = snapshot;
            if (!isProgressCount(settledRounds)) {
                return null;
            }
            const oldRoundOrders = fulfilledOrders - settledRounds * ORDERS_PER_ROUND;
            if (oldRoundOrders < 0 || oldRoundOrders > ORDERS_PER_ROUND) {
                return null;
            }
            session.progress.chapter = settledRounds > 0 ? 2 : 1;
            session.progress.deliveredInChapter = settledRounds > 0 ? 0 : oldRoundOrders;
            session.progress.stamps = fulfilledOrders;
        } else {
            const { roundNumber, roundOrderCount, generatorLevel, upgradeStamps, supplyRoute } = snapshot;
            if (!isProgressCount(roundNumber) || roundNumber < 1 || !isProgressCount(roundOrderCount)
                || !isProgressCount(generatorLevel) || generatorLevel < 1
                || generatorLevel > ALLOY_GENERATOR_LEVELS.length || ALLOY_GENERATOR_LEVELS[generatorLevel - 1].chapter > roundNumber
                || !isProgressCount(upgradeStamps) || upgradeStamps > fulfilledOrders
                || !supplyRoute || ALLOY_SUPPLY_ROUTES.indexOf(supplyRoute) === -1
                || (roundNumber === 1 && supplyRoute !== 'mixed')) {
                return null;
            }
            const completedStoryOrders = ALLOY_CHAPTERS.slice(0, roundNumber - 1)
                .reduce((sum, chapter) => sum + chapter.orders.length, 0);
            const completedFreeRounds = Math.max(0, roundNumber - ALLOY_CHAPTERS.length - 1);
            if (roundOrderCount > AlloyOrderSystem.getRoundOrderTotal(roundNumber)
                || completedStoryOrders + completedFreeRounds * ALLOY_FREE_PLAY_ORDER_COUNT + roundOrderCount > fulfilledOrders) {
                return null;
            }
            session.progress.chapter = roundNumber;
            session.progress.deliveredInChapter = roundOrderCount;
            session.progress.stamps = upgradeStamps;
            session.generator.level = generatorLevel;
            session.generator.route = supplyRoute;
        }
        state.recoverEnergy(nowMs);
        return state;
    }

    // 将世界组件投影为原有格式的存档，并复制道具避免引用外泄。
    public getSnapshot(): AlloyProgressSnapshot {
        const { energy, generator, progress, tutorial } = this.world.session;
        return {
            version: 2,
            cells: this.board.map((item) => item ? { ...item } : null),
            generatedCount: generator.count,
            nextEnergyAtMs: energy.nextRecoveryAtMs,
            energy: energy.amount,
            fulfilledOrders: progress.deliveredTotal,
            roundNumber: progress.chapter,
            roundOrderCount: progress.deliveredInChapter,
            generatorLevel: generator.level,
            upgradeStamps: progress.stamps,
            supplyRoute: generator.route,
            tutorial: tutorial.step,
        };
    }

    // 按格序提供给场景绘制的棋盘投影。
    public get board(): readonly (AlloyItem | null)[] {
        return this.world.readBoard();
    }

    // 返回体力组件中当前可用的体力。
    public get energy(): number {
        return this.world.session.energy.amount;
    }

    // 返回累计交付的订单数。
    public get orderCount(): number {
        return this.world.session.progress.deliveredTotal;
    }

    // 返回当前剧情关卡或自由营业轮次的连续编号。
    public get roundNumber(): number {
        return this.world.session.progress.chapter;
    }

    // 返回本轮已经交付的订单数。
    public get roundOrderCount(): number {
        return this.world.session.progress.deliveredInChapter;
    }

    // 返回本轮需要完成的订单数。
    public get roundOrderTotal(): number {
        return AlloyOrderSystem.getRoundOrderTotal(this.roundNumber);
    }

    // 读取订单系统生成的当前关卡标题。
    public get roundTitle(): string {
        return AlloyOrderSystem.getRoundTitle(this.world);
    }

    // 读取结算页面需要显示的下一站名称。
    public get nextRoundName(): string {
        return AlloyOrderSystem.getNextRoundName(this.world);
    }

    // 读取剧情是否已经通关。
    public get campaignComplete(): boolean {
        return AlloyOrderSystem.isCampaignComplete(this.world);
    }

    // 读取当前轮次是否正在等待结算。
    public get roundComplete(): boolean {
        return AlloyOrderSystem.isRoundComplete(this.world);
    }

    // 让订单系统从已结算的轮次推进到下一轮。
    public continueRound(): boolean {
        return AlloyOrderSystem.continueRound(this.world);
    }

    // 获取当前订单，供界面展示交付要求。
    public get order(): AlloyOrder {
        return AlloyOrderSystem.getOrder(this.world);
    }

    // 获取下一次补货使用的道具系列。
    public get nextFamily(): AlloyFamily {
        return AlloySupplySystem.getNextFamily(this.world);
    }

    // 获取下一件补货道具的系列和阶数。
    public get nextItem(): AlloyItem {
        return AlloySupplySystem.getNextItem(this.world);
    }

    // 返回生成器组件中当前的补货台等级。
    public get generatorLevel(): number {
        return this.world.session.generator.level;
    }

    // 返回进度组件中剩余的升级印章。
    public get upgradeStamps(): number {
        return this.world.session.progress.stamps;
    }

    // 返回下一次升级费用，满级时返回空值。
    public get nextUpgradeCost(): number | null {
        return AlloySupplySystem.getNextUpgrade(this.world)?.cost ?? null;
    }

    // 返回开放下一次升级所需的关卡。
    public get nextUpgradeChapter(): number | null {
        return AlloySupplySystem.getNextUpgrade(this.world)?.chapter ?? null;
    }

    // 判断下一次补货台升级是否已开放。
    public get generatorUpgradeUnlocked(): boolean {
        return AlloySupplySystem.isUpgradeUnlocked(this.world);
    }

    // 提交升级操作并返回新的补货台等级。
    public upgradeGenerator(): number | null {
        return AlloySupplySystem.upgradeGenerator(this.world);
    }

    // 判断当前关卡是否开放定向补货。
    public get canSelectSupplyRoute(): boolean {
        return AlloySupplySystem.canSelectSupplyRoute(this.world);
    }

    // 返回生成器组件中选定的补货线路。
    public get supplyRoute(): AlloySupplyRoute {
        return this.world.session.generator.route;
    }

    // 提交换线操作并返回新线路。
    public cycleSupplyRoute(): AlloySupplyRoute | null {
        return AlloySupplySystem.cycleSupplyRoute(this.world);
    }

    // 返回教程组件中当前的新手引导步骤。
    public get tutorial(): AlloyTutorialStep {
        return this.world.session.tutorial.step;
    }

    // 让体力系统补发当前时刻已经到期的体力。
    public recoverEnergy(nowMs: number): void {
        AlloyEnergySystem.recoverEnergy(this.world, nowMs);
    }

    // 查询距离下一次体力恢复还剩几秒。
    public secondsUntilEnergy(nowMs: number): number {
        return AlloyEnergySystem.secondsUntilEnergy(this.world, nowMs);
    }

    // 提交补货操作并返回落点或补货失败原因。
    public generate(nowMs: number): number | 'noEnergy' | 'full' | 'roundComplete' {
        return AlloySupplySystem.generate(this.world, nowMs);
    }

    // 提交一次拖拽落格，返回棋盘系统处理结果。
    public drop(from: number, to: number): AlloyDropResult {
        return AlloyBoardSystem.drop(this.world, from, to);
    }

    // 查询两个棋盘格中的道具是否可以合成。
    public canMerge(from: number, to: number): boolean {
        return AlloyBoardSystem.canMerge(this.world, from, to);
    }

    // 查询首件订单道具所在的格子，供引导高亮使用。
    public getOrderCell(): number {
        return AlloyOrderSystem.getOrderCell(this.world);
    }

    // 查询棋盘是否备齐当前订单需要的物品。
    public canDeliver(): boolean {
        return AlloyOrderSystem.canDeliver(this.world);
    }

    // 提交订单并返回成功交付的订单内容。
    public deliver(nowMs: number): AlloyOrder | null {
        return AlloyOrderSystem.deliver(this.world, nowMs);
    }

    // 查询指定格子是否满足回收条件。
    public canRecycle(cell: number): boolean {
        return AlloyBoardSystem.canRecycle(this.world, cell);
    }

    // 提交指定格子的回收操作。
    public recycle(cell: number): boolean {
        return AlloyBoardSystem.recycle(this.world, cell);
    }
}
