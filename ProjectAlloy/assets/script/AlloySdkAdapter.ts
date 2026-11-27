import { _decorator, Component } from 'cc';
import type { AlloyItem, AlloySupplyRoute } from './AlloyGameState';

const { ccclass } = _decorator;

export type AlloySdkEvent =
    | { type: 'game_start' }
    | { type: 'item_generated'; item: AlloyItem; energy: number }
    | { type: 'item_merged'; item: AlloyItem }
    | { type: 'order_delivered'; orderCount: number; item: AlloyItem; extraItem?: AlloyItem }
    | { type: 'tutorial_completed' }
    | { type: 'round_completed'; roundNumber: number; orderCount: number }
    | { type: 'round_continued'; roundNumber: number; orderCount: number }
    | { type: 'generator_upgraded'; level: number; roundNumber: number; remainingStamps: number }
    | { type: 'supply_route_changed'; route: AlloySupplyRoute; roundNumber: number }
    | { type: 'campaign_completed'; roundNumber: number; orderCount: number }
    | { type: 'game_restarted'; previousOrderCount: number };

@ccclass('AlloySdkAdapter')
export class AlloySdkAdapter extends Component {
    // 接收玩法事件，供接入广告平台时覆写并转发。
    public trackEvent(_event: AlloySdkEvent): void {
    }
}
