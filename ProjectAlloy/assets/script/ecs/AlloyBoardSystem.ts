import { ALLOY_ITEMS } from '../AlloyCampaign';
import { canDeliver, isRoundComplete } from './AlloyOrderSystem';
import type { AlloyWorld } from './AlloyWorld';

export type AlloyDropResult = 'move' | 'merge' | 'blocked';

// 判断两个格子的道具是否同系列、同阶且还能继续升阶。
export function canMerge(world: AlloyWorld, from: number, to: number): boolean {
    const source = world.itemAt(from);
    const target = world.itemAt(to);
    return !isRoundComplete(world) && from !== to && !!source && !!target && source.family === target.family
        && source.tier === target.tier && source.tier < ALLOY_ITEMS[source.family].length;
}

// 提交一次棋盘移动或合成，操作成功后更新首单引导。
export function drop(world: AlloyWorld, from: number, to: number): AlloyDropResult {
    const source = world.itemAt(from);
    if (isRoundComplete(world) || !world.hasCell(from) || !world.hasCell(to) || from === to || !source) {
        return 'blocked';
    }
    const target = world.itemAt(to);
    if (target && !canMerge(world, from, to)) {
        return 'blocked';
    }
    world.setItem(from, null);
    world.setItem(to, target ? { family: source.family, tier: source.tier + 1 } : source);
    const { tutorial } = world.session;
    if (tutorial.step === 'merge' || tutorial.step === 'deliver') {
        tutorial.step = canDeliver(world) ? 'deliver' : 'merge';
    }
    return target ? 'merge' : 'move';
}

// 检查所选格是否可回收，教程中仅在棋盘填满时提前开放。
export function canRecycle(world: AlloyWorld, cell: number): boolean {
    return !isRoundComplete(world) && world.hasCell(cell) && !!world.itemAt(cell)
        && (world.session.tutorial.step === 'complete' || world.firstEmptyCell() === -1);
}

// 移除可回收的道具，必要时把首单引导退回合成步骤。
export function recycle(world: AlloyWorld, cell: number): boolean {
    if (!canRecycle(world, cell)) {
        return false;
    }
    world.setItem(cell, null);
    const { tutorial } = world.session;
    if (tutorial.step === 'deliver' && !canDeliver(world)) {
        tutorial.step = 'merge';
    }
    return true;
}
