export const ALLOY_ITEMS = {
    copper: ['面团', '贝果', '早餐三明治', '肉桂可颂', '樱桃丹麦酥', '烘焙礼篮'],
    quartz: ['咖啡豆', '浓缩咖啡', '拿铁', '冰摩卡', '阿芙佳朵', '咖啡品鉴组'],
    berry: ['草莓', '综合莓果', '草莓果酱', '莓果蛋糕切片', '莓果庆典蛋糕'],
} as const;

export type AlloyFamily = keyof typeof ALLOY_ITEMS;
export type AlloySupplyRoute = 'mixed' | AlloyFamily;

export interface AlloyItem {
    readonly family: AlloyFamily;
    readonly tier: number;
}

export interface AlloyOrder {
    readonly customer: string;
    readonly item: AlloyItem;
    readonly extraItem?: AlloyItem;
    readonly reward: number;
}

export interface AlloyChapter {
    readonly name: string;
    readonly orders: readonly AlloyOrder[];
}

export const ALLOY_ROUTE_LABELS: Record<AlloySupplyRoute, string> = {
    mixed: '混合', copper: '面点', quartz: '咖啡', berry: '莓果',
};

export const ALLOY_FAMILIES: readonly AlloyFamily[] = ['copper', 'quartz', 'berry'];
export const ALLOY_SUPPLY_ROUTES: readonly AlloySupplyRoute[] = ['mixed', ...ALLOY_FAMILIES];

// 将订单表中的系列和阶数转换为交付目标。
function item(family: AlloyFamily, tier: number): AlloyItem {
    return { family, tier };
}

// 建立单品或双品订单，奖励统一以体力计。
function order(customer: string, reward: number, primary: AlloyItem, extraItem?: AlloyItem): AlloyOrder {
    return { customer, item: primary, ...(extraItem ? { extraItem } : {}), reward };
}

export const ALLOY_CHAPTERS: readonly AlloyChapter[] = [
    {
        name: '试营业',
        orders: [
            order('早班客人', 3, item('copper', 2)),
            order('临窗客人', 4, item('quartz', 2)),
            order('午餐客人', 6, item('copper', 3)),
            order('午后客人', 6, item('quartz', 3)),
        ],
    },
    {
        name: '莓果季',
        orders: [
            order('果园来客', 5, item('berry', 2)),
            order('双人午餐', 6, item('copper', 3), item('quartz', 2)),
            order('果酱爱好者', 7, item('berry', 3)),
            order('面包订客', 8, item('copper', 4)),
            order('冰饮试喝会', 9, item('quartz', 4), item('berry', 2)),
        ],
    },
    {
        name: '周末茶会',
        orders: [
            order('甜品订客', 7, item('berry', 4)),
            order('邻里聚会', 8, item('copper', 4), item('quartz', 3)),
            order('茶会主理人', 9, item('copper', 5)),
            order('街角读书会', 9, item('quartz', 5)),
            order('周末拼桌', 9, item('berry', 4), item('quartz', 4)),
            order('茶会收尾', 10, item('berry', 5)),
        ],
    },
    {
        name: '节庆餐桌',
        orders: [
            order('节前外带', 8, item('copper', 5), item('berry', 3)),
            order('烘焙展台', 10, item('copper', 6)),
            order('咖啡展台', 10, item('quartz', 6)),
            order('生日订客', 10, item('berry', 5), item('quartz', 4)),
            order('街区野餐', 10, item('copper', 5), item('copper', 5)),
            order('节庆压轴', 12, item('copper', 6), item('quartz', 6)),
        ],
    },
];

export const ALLOY_FREE_PLAY_ORDERS: readonly AlloyOrder[] = [
    order('街角熟客', 8, item('berry', 4), item('quartz', 3)),
    order('午后小聚', 9, item('quartz', 5), item('copper', 3)),
    order('烘焙分享会', 10, item('copper', 6)),
    order('约会餐桌', 9, item('berry', 5), item('copper', 4)),
    order('咖啡分享会', 10, item('quartz', 6)),
    order('双份甜点', 10, item('berry', 4), item('berry', 4)),
    order('社区庆典', 12, item('copper', 6), item('berry', 5)),
];

export const ALLOY_FREE_PLAY_ORDER_COUNT = 5;
export const ALLOY_GENERATOR_LEVELS = [
    { chapter: 1, cost: 0, tier: 1, bonusEvery: 0 },
    { chapter: 2, cost: 4, tier: 1, bonusEvery: 3 },
    { chapter: 3, cost: 5, tier: 2, bonusEvery: 0 },
    { chapter: 4, cost: 6, tier: 2, bonusEvery: 3 },
] as const;

// 根据物品的系列和阶数返回界面使用的名称。
export function getAlloyItemName(value: AlloyItem): string {
    return ALLOY_ITEMS[value.family][value.tier - 1];
}
