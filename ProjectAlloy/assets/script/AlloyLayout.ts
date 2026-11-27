import { _decorator, Component, Label, Node, Sprite } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('AlloyLayout')
export class AlloyLayout extends Component {
    @property({ type: Node, tooltip: '包含全部格子和拖拽预览的棋盘触摸区域。' })
    public board: Node | null = null;

    @property({ type: [Sprite], tooltip: '按从左到右、从上到下排列的棋盘格底图。' })
    public tiles: Sprite[] = [];

    @property({ type: [Sprite], tooltip: '与棋盘格底图一一对应的选中和目标边框。' })
    public focusFrames: Sprite[] = [];

    @property({ type: [Sprite], tooltip: '与棋盘格底图一一对应的物品显示图。' })
    public items: Sprite[] = [];

    @property({ type: [Label], tooltip: '与棋盘格底图一一对应的等级标签。' })
    public tiers: Label[] = [];

    @property({ type: Sprite, tooltip: '拖动棋盘物品时跟随触点显示的图片。' })
    public dragPreview: Sprite | null = null;

    @property({ type: Label, tooltip: '显示剩余体力和下次恢复时间的文字。' })
    public energyLabel: Label | null = null;

    @property({ type: [Sprite], tooltip: '按顺序点亮的体力格，每格表示一点体力。' })
    public energyPips: Sprite[] = [];

    @property({ type: Label, tooltip: '显示当前订单编号和顾客名称的文字。' })
    public orderLabel: Label | null = null;

    @property({ type: Label, tooltip: '显示当前订单所需物品的名称。' })
    public orderItemLabel: Label | null = null;

    @property({ type: Label, tooltip: '显示交付当前订单的体力奖励。' })
    public orderRewardLabel: Label | null = null;

    @property({ type: Sprite, tooltip: '显示当前订单所需物品的图标。' })
    public orderIcon: Sprite | null = null;

    @property({ type: Sprite, tooltip: '双品订单中第二件所需物品的图标。' })
    public extraOrderIcon: Sprite | null = null;

    @property({ type: Label, tooltip: '双品订单中第二件物品的名称。' })
    public extraOrderLabel: Label | null = null;

    @property({ type: Label, tooltip: '显示补货台等级和可用升级印章。' })
    public generatorTitle: Label | null = null;

    @property({ type: Sprite, tooltip: '循环切换混合、面点、咖啡和莓果补货线路的按钮。' })
    public routeButton: Sprite | null = null;

    @property({ type: Sprite, tooltip: '消耗印章升级补货台并显示升级花费的按钮。' })
    public upgradeButton: Sprite | null = null;

    @property({ type: Label, tooltip: '显示补货台下一件会生成的道具。' })
    public supplyLabel: Label | null = null;

    @property({ type: Sprite, tooltip: '显示补货台下一件道具的缩略图。' })
    public supplyIcon: Sprite | null = null;

    @property({ type: Label, tooltip: '显示当前新手引导步骤的标题。' })
    public guideTitle: Label | null = null;

    @property({ type: Label, tooltip: '显示当前步骤的操作指引。' })
    public guideInstruction: Label | null = null;

    @property({ type: Label, tooltip: '显示上一次合成、补货或交付的结果。' })
    public statusLabel: Label | null = null;

    @property({ type: Sprite, tooltip: '绑定交付按钮底图，按钮节点下放置文字标签。' })
    public deliverButton: Sprite | null = null;

    @property({ type: Sprite, tooltip: '绑定补货按钮底图，按钮节点下放置文字标签。' })
    public generateButton: Sprite | null = null;

    @property({ type: Sprite, tooltip: '绑定回收按钮底图，按钮节点下放置文字标签。' })
    public recycleButton: Sprite | null = null;

    @property({ type: Sprite, tooltip: '绑定声音开关底图，按钮节点下放置文字标签。' })
    public muteButton: Sprite | null = null;

    @property({ type: Label, tooltip: '显示当前营业轮次和已交付订单数量。' })
    public roundProgress: Label | null = null;

    @property({ type: Sprite, tooltip: '打开重开确认弹窗的按钮底图。' })
    public restartButton: Sprite | null = null;

    @property({ type: Node, tooltip: '用于营业结算和重开确认的弹窗遮罩节点。' })
    public roundDialog: Node | null = null;

    @property({ type: Label, tooltip: '显示本轮结算结果或重开确认标题。' })
    public dialogTitle: Label | null = null;

    @property({ type: Label, tooltip: '显示累计交付进度或重开后会重置的内容。' })
    public dialogDetail: Label | null = null;

    @property({ type: Sprite, tooltip: '弹窗主操作按钮，用于继续营业或确认重开。' })
    public dialogPrimary: Sprite | null = null;

    @property({ type: Sprite, tooltip: '弹窗次操作按钮，用于提出重开或取消。' })
    public dialogSecondary: Sprite | null = null;
}
