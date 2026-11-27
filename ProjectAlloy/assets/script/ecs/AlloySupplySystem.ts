import { ALLOY_FAMILIES, ALLOY_GENERATOR_LEVELS, ALLOY_SUPPLY_ROUTES } from '../AlloyCampaign';
import type { AlloyFamily, AlloyItem, AlloySupplyRoute } from '../AlloyCampaign';
import { recoverEnergy, spendEnergy } from './AlloyEnergySystem';
import { isRoundComplete } from './AlloyOrderSystem';
import type { AlloyWorld } from './AlloyWorld';

const GENERATOR_PATTERN: readonly AlloyFamily[] = ['copper', 'copper', 'quartz', 'copper', 'quartz'];

// 在试营业结束后开放定向补货。
export function canSelectSupplyRoute(world: AlloyWorld): boolean {
    return world.session.progress.chapter > 1;
}

// 根据当前线路和出货次数确定下一件道具的系列。
export function getNextFamily(world: AlloyWorld): AlloyFamily {
    const { route, count } = world.session.generator;
    if (route !== 'mixed') {
        return route;
    }
    const pattern = canSelectSupplyRoute(world) ? ALLOY_FAMILIES : GENERATOR_PATTERN;
    return pattern[count % pattern.length];
}

// 用补货台等级计算下一件产出的系列和阶数。
export function getNextItem(world: AlloyWorld): AlloyItem {
    const { count, level } = world.session.generator;
    const { tier, bonusEvery } = ALLOY_GENERATOR_LEVELS[level - 1];
    const bonus = bonusEvery > 0 && (count + 1) % bonusEvery === 0;
    return { family: getNextFamily(world), tier: bonus ? tier + 1 : tier };
}

// 返回下一次升级的配置，满级时返回空值。
export function getNextUpgrade(world: AlloyWorld): typeof ALLOY_GENERATOR_LEVELS[number] | undefined {
    return ALLOY_GENERATOR_LEVELS[world.session.generator.level];
}

// 检查当前关卡是否达到下一次升级的解锁要求。
export function isUpgradeUnlocked(world: AlloyWorld): boolean {
    const upgrade = getNextUpgrade(world);
    return !!upgrade && upgrade.chapter <= world.session.progress.chapter;
}

// 校验升级条件并消耗印章，提高补货台等级。
export function upgradeGenerator(world: AlloyWorld): number | null {
    const upgrade = getNextUpgrade(world);
    const { progress, generator } = world.session;
    if (isRoundComplete(world) || !upgrade || progress.chapter < upgrade.chapter || progress.stamps < upgrade.cost) {
        return null;
    }
    progress.stamps -= upgrade.cost;
    generator.level += 1;
    return generator.level;
}

// 确认定向补货已经开放，再轮换到下一条线路。
export function cycleSupplyRoute(world: AlloyWorld): AlloySupplyRoute | null {
    if (!canSelectSupplyRoute(world) || isRoundComplete(world)) {
        return null;
    }
    const { generator } = world.session;
    const next = (ALLOY_SUPPLY_ROUTES.indexOf(generator.route) + 1) % ALLOY_SUPPLY_ROUTES.length;
    generator.route = ALLOY_SUPPLY_ROUTES[next];
    return generator.route;
}

// 在首个空格生成道具，成功时消耗体力并推进补货引导。
export function generate(world: AlloyWorld, nowMs: number): number | 'noEnergy' | 'full' | 'roundComplete' {
    if (isRoundComplete(world)) {
        return 'roundComplete';
    }
    recoverEnergy(world, nowMs);
    const cell = world.firstEmptyCell();
    if (cell === -1) {
        return 'full';
    }
    if (!spendEnergy(world, nowMs)) {
        return 'noEnergy';
    }
    world.setItem(cell, getNextItem(world));
    const { generator, tutorial } = world.session;
    generator.count += 1;
    if (tutorial.step === 'generate') {
        tutorial.step = 'merge';
    }
    return cell;
}
