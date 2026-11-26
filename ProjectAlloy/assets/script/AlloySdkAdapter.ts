import { _decorator, Component } from 'cc';
import type { AlloyItem } from './AlloyGameState';

const { ccclass } = _decorator;

export type AlloySdkEvent =
    | { type: 'game_start' }
    | { type: 'item_generated'; item: AlloyItem; energy: number }
    | { type: 'item_merged'; item: AlloyItem }
    | { type: 'order_delivered'; orderCount: number; item: AlloyItem }
    | { type: 'tutorial_completed' };

@ccclass('AlloySdkAdapter')
export class AlloySdkAdapter extends Component {
    // 接收玩法事件，供接入广告平台时覆写并转发。
    public trackEvent(_event: AlloySdkEvent): void {
    }
}
