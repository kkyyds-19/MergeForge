import { ALLOY_CHAPTERS, ALLOY_FREE_PLAY_ORDER_COUNT, ALLOY_FREE_PLAY_ORDERS } from '../AlloyCampaign';
import type { AlloyItem, AlloyOrder } from '../AlloyCampaign';
import { grantEnergy } from './AlloyEnergySystem';
import type { AlloyWorld } from './AlloyWorld';

// 返回指定剧情关卡或自由营业轮次所需的订单数。
export function getRoundOrderTotal(roundNumber: number): number {
    return ALLOY_CHAPTERS[roundNumber - 1]?.orders.length ?? ALLOY_FREE_PLAY_ORDER_COUNT;
}

// 根据当前轮次生成剧情关名或自由营业标题。
export function getRoundTitle(world: AlloyWorld): string {
    const { chapter } = world.session.progress;
    const entry = ALLOY_CHAPTERS[chapter - 1];
    return entry ? `第 ${chapter} 关 · ${entry.name}` : `自由营业 ${chapter - ALLOY_CHAPTERS.length}`;
}

// 返回结算页展示的下一站名称。
export function getNextRoundName(world: AlloyWorld): string {
    return ALLOY_CHAPTERS[world.session.progress.chapter]?.name ?? '自由营业';
}

// 判断本轮的全部订单是否已经交付。
export function isRoundComplete(world: AlloyWorld): boolean {
    const { chapter, deliveredInChapter } = world.session.progress;
    return deliveredInChapter === getRoundOrderTotal(chapter);
}

// 判断最后一关是否已经完成。
export function isCampaignComplete(world: AlloyWorld): boolean {
    const { chapter } = world.session.progress;
    return chapter > ALLOY_CHAPTERS.length || (chapter === ALLOY_CHAPTERS.length && isRoundComplete(world));
}

// 结算当前轮次，将订单指针移到下一轮第一单。
export function continueRound(world: AlloyWorld): boolean {
    if (!isRoundComplete(world)) {
        return false;
    }
    const { progress } = world.session;
    progress.chapter += 1;
    progress.deliveredInChapter = 0;
    return true;
}

// 读取当前订单，在结算时保留末单，自由营业时按轮次轮换菜单。
export function getOrder(world: AlloyWorld): AlloyOrder {
    const { chapter, deliveredInChapter } = world.session.progress;
    const index = Math.min(deliveredInChapter, getRoundOrderTotal(chapter) - 1);
    const entry = ALLOY_CHAPTERS[chapter - 1];
    if (entry) {
        return entry.orders[index];
    }
    const offset = (chapter - ALLOY_CHAPTERS.length - 1) % ALLOY_FREE_PLAY_ORDERS.length;
    return ALLOY_FREE_PLAY_ORDERS[(offset + index) % ALLOY_FREE_PLAY_ORDERS.length];
}

// 从同时拥有格子与道具组件的实体中匹配物品，可跳过已占用的交付格。
function findItemCell(world: AlloyWorld, required: AlloyItem, except: number): number {
    const match = world.with('cell', 'item').find(({ cell, item }) =>
        cell !== except && item.family === required.family && item.tier === required.tier);
    return match?.cell ?? -1;
}

// 查找首件订单物品，供新手引导高亮对应格子。
export function getOrderCell(world: AlloyWorld): number {
    return findItemCell(world, getOrder(world).item, -1);
}

// 按格序匹配整单的物品，让双份同款使用不同实体。
function getDeliveryCells(world: AlloyWorld, order: AlloyOrder): readonly number[] | null {
    const first = findItemCell(world, order.item, -1);
    if (first === -1) {
        return null;
    }
    if (!order.extraItem) {
        return [first];
    }
    const extra = findItemCell(world, order.extraItem, first);
    return extra === -1 ? null : [first, extra];
}

// 检查当前营业状态和棋盘物品是否允许完成交付。
export function canDeliver(world: AlloyWorld): boolean {
    return !isRoundComplete(world) && getDeliveryCells(world, getOrder(world)) !== null;
}

// 原子地扣除整单物品，再发体力与印章并推进营业进度。
export function deliver(world: AlloyWorld, nowMs: number): AlloyOrder | null {
    if (isRoundComplete(world)) {
        return null;
    }
    const order = getOrder(world);
    const cells = getDeliveryCells(world, order);
    if (!cells) {
        return null;
    }
    for (const cell of cells) {
        world.setItem(cell, null);
    }
    const { progress, tutorial } = world.session;
    progress.deliveredTotal += 1;
    progress.deliveredInChapter += 1;
    progress.stamps += 1;
    grantEnergy(world, order.reward, nowMs);
    tutorial.step = 'complete';
    return order;
}
