import type { AlloyWorld } from './AlloyWorld';

export const ENERGY_CAPACITY = 12;
export const ENERGY_INTERVAL_MS = 5000;

// 按绝对时间补发已到期的体力，满值时清除恢复时间。
export function recoverEnergy(world: AlloyWorld, nowMs: number): void {
    const { energy } = world.session;
    const deadline = energy.nextRecoveryAtMs;
    if (deadline === null || nowMs < deadline) {
        return;
    }
    const recovered = 1 + Math.floor((nowMs - deadline) / ENERGY_INTERVAL_MS);
    energy.amount = Math.min(ENERGY_CAPACITY, energy.amount + recovered);
    energy.nextRecoveryAtMs = energy.amount === ENERGY_CAPACITY ? null : deadline + recovered * ENERGY_INTERVAL_MS;
}

// 返回到下一点体力恢复所剩的完整显示秒数。
export function secondsUntilEnergy(world: AlloyWorld, nowMs: number): number {
    const { nextRecoveryAtMs } = world.session.energy;
    return nextRecoveryAtMs === null ? 0 : Math.max(0, Math.ceil((nextRecoveryAtMs - nowMs) / 1000));
}

// 扣除一个体力并在需要时启动恢复计时。
export function spendEnergy(world: AlloyWorld, nowMs: number): boolean {
    const { energy } = world.session;
    if (energy.amount === 0) {
        return false;
    }
    energy.amount -= 1;
    if (energy.nextRecoveryAtMs === null) {
        energy.nextRecoveryAtMs = nowMs + ENERGY_INTERVAL_MS;
    }
    return true;
}

// 发放订单奖励并将体力限制在上限以内。
export function grantEnergy(world: AlloyWorld, reward: number, nowMs: number): void {
    recoverEnergy(world, nowMs);
    const { energy } = world.session;
    energy.amount = Math.min(ENERGY_CAPACITY, energy.amount + reward);
    if (energy.amount === ENERGY_CAPACITY) {
        energy.nextRecoveryAtMs = null;
    }
}
