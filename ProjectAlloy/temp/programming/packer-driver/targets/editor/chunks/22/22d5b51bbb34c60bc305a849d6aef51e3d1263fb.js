System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioClip, AudioSource, Color, Component, instantiate, Label, Node, Prefab, profiler, Sprite, SpriteAtlas, SpriteFrame, sys, UITransform, Vec2, Vec3, view, ALLOY_ITEM_FRAMES, ALLOY_CHAPTERS, ALLOY_ROUTE_LABELS, AlloyGameState, ENERGY_CAPACITY, getAlloyItemName, AlloyLayout, AlloySdkAdapter, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, PROGRESS_KEY, COLORS, GUIDE, AlloyGame;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfALLOY_ITEM_FRAMES(extras) {
    _reporterNs.report("ALLOY_ITEM_FRAMES", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_CHAPTERS(extras) {
    _reporterNs.report("ALLOY_CHAPTERS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_ROUTE_LABELS(extras) {
    _reporterNs.report("ALLOY_ROUTE_LABELS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyGameState(extras) {
    _reporterNs.report("AlloyGameState", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfENERGY_CAPACITY(extras) {
    _reporterNs.report("ENERGY_CAPACITY", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetAlloyItemName(extras) {
    _reporterNs.report("getAlloyItemName", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyItem(extras) {
    _reporterNs.report("AlloyItem", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyTutorialStep(extras) {
    _reporterNs.report("AlloyTutorialStep", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyLayout(extras) {
    _reporterNs.report("AlloyLayout", "./AlloyLayout", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloySdkAdapter(extras) {
    _reporterNs.report("AlloySdkAdapter", "./AlloySdkAdapter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloySdkEvent(extras) {
    _reporterNs.report("AlloySdkEvent", "./AlloySdkAdapter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
      Color = _cc.Color;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      profiler = _cc.profiler;
      Sprite = _cc.Sprite;
      SpriteAtlas = _cc.SpriteAtlas;
      SpriteFrame = _cc.SpriteFrame;
      sys = _cc.sys;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      view = _cc.view;
    }, function (_unresolved_2) {
      ALLOY_ITEM_FRAMES = _unresolved_2.ALLOY_ITEM_FRAMES;
    }, function (_unresolved_3) {
      ALLOY_CHAPTERS = _unresolved_3.ALLOY_CHAPTERS;
      ALLOY_ROUTE_LABELS = _unresolved_3.ALLOY_ROUTE_LABELS;
    }, function (_unresolved_4) {
      AlloyGameState = _unresolved_4.AlloyGameState;
      ENERGY_CAPACITY = _unresolved_4.ENERGY_CAPACITY;
      getAlloyItemName = _unresolved_4.getAlloyItemName;
    }, function (_unresolved_5) {
      AlloyLayout = _unresolved_5.AlloyLayout;
    }, function (_unresolved_6) {
      AlloySdkAdapter = _unresolved_6.AlloySdkAdapter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b938dki/EhNVbckTw4a6DIE", "AlloyGame", undefined);

      __checkObsolete__(['_decorator', 'AudioClip', 'AudioSource', 'Color', 'Component', 'EventTouch', 'instantiate', 'Label', 'Node', 'Prefab', 'profiler', 'Sprite', 'SpriteAtlas', 'SpriteFrame', 'sys', 'UITransform', 'Vec2', 'Vec3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);
      PROGRESS_KEY = 'ProjectAlloy.progress.v1';
      COLORS = {
        activeText: new Color(58, 42, 31),
        mutedText: new Color(97, 79, 66),
        inactive: new Color(219, 208, 193),
        green: new Color(165, 219, 153),
        orange: new Color(255, 198, 119),
        emptyTile: new Color(233, 223, 207),
        filledTile: new Color(255, 250, 237),
        blocked: new Color(247, 176, 160)
      };
      GUIDE = {
        generate: {
          title: '1 / 3   补一份食材',
          instruction: '点一下补货台的按钮。'
        },
        merge: {
          title: '2 / 3   合成贝果',
          instruction: '把一团面团拖到另一团面团上。'
        },
        deliver: {
          title: '3 / 3   交付首单',
          instruction: '点击交付，把贝果送给顾客。'
        },
        complete: {
          title: '餐坊操作',
          instruction: '同类同阶可合成。点选多余道具后可回收。'
        }
      };

      _export("AlloyGame", AlloyGame = (_dec = ccclass('AlloyGame'), _dec2 = property({
        type: AudioClip,
        tooltip: '有效操作后开始循环播放的背景音乐。'
      }), _dec3 = property({
        type: AudioClip,
        tooltip: '成功补货时播放的音效。'
      }), _dec4 = property({
        type: AudioClip,
        tooltip: '两件物品成功合成时播放的音效。'
      }), _dec5 = property({
        type: AudioClip,
        tooltip: '成功交付订单并领取奖励时播放的音效。'
      }), _dec6 = property({
        type: _crd && AlloySdkAdapter === void 0 ? (_reportPossibleCrUseOfAlloySdkAdapter({
          error: Error()
        }), AlloySdkAdapter) : AlloySdkAdapter,
        tooltip: '供试玩广告平台接收玩法事件的 SDK 适配组件。'
      }), _dec7 = property({
        type: Prefab,
        tooltip: '横屏时使用的餐坊布局，可双击预制体调整位置和换图。'
      }), _dec8 = property({
        type: Prefab,
        tooltip: '竖屏时使用的餐坊布局，可双击预制体调整位置和换图。'
      }), _dec9 = property({
        type: Sprite,
        tooltip: '主场景背景图，运行时按照画布尺寸铺满。'
      }), _dec10 = property({
        type: SpriteAtlas,
        tooltip: '棋盘道具与订单共用的默认道具图集。'
      }), _dec11 = property({
        type: SpriteAtlas,
        tooltip: '后续关卡的高阶面点、咖啡和莓果道具图集。'
      }), _dec12 = property({
        type: [SpriteFrame],
        tooltip: '按从面团到烘焙礼篮的阶数顺序覆盖面点图片。'
      }), _dec13 = property({
        type: [SpriteFrame],
        tooltip: '按从咖啡豆到咖啡品鉴组的阶数顺序覆盖咖啡图片。'
      }), _dec14 = property({
        type: [SpriteFrame],
        tooltip: '按从草莓到莓果庆典蛋糕的阶数顺序覆盖莓果图片。'
      }), _dec15 = property({
        tooltip: '保存棋盘、体力、关卡和补货台进度，关闭后每次载入从试营业开始。'
      }), _dec(_class = (_class2 = class AlloyGame extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "musicClip", _descriptor, this);

          _initializerDefineProperty(this, "generateClip", _descriptor2, this);

          _initializerDefineProperty(this, "mergeClip", _descriptor3, this);

          _initializerDefineProperty(this, "orderClip", _descriptor4, this);

          _initializerDefineProperty(this, "sdkAdapter", _descriptor5, this);

          _initializerDefineProperty(this, "landscapeLayout", _descriptor6, this);

          _initializerDefineProperty(this, "portraitLayout", _descriptor7, this);

          _initializerDefineProperty(this, "backdrop", _descriptor8, this);

          _initializerDefineProperty(this, "itemAtlas", _descriptor9, this);

          _initializerDefineProperty(this, "campaignAtlas", _descriptor10, this);

          _initializerDefineProperty(this, "copperItemFrames", _descriptor11, this);

          _initializerDefineProperty(this, "quartzItemFrames", _descriptor12, this);

          _initializerDefineProperty(this, "berryItemFrames", _descriptor13, this);

          _initializerDefineProperty(this, "persistProgress", _descriptor14, this);

          this.state = void 0;
          this.audio = void 0;
          this.audioUnlocked = false;
          this.musicRequested = false;
          this.muted = false;
          this.playfield = null;
          this.portrait = void 0;
          this.selected = -1;
          this.gesture = null;
          this.restartPending = false;
          this.status = '等待补货';
          this.energyDisplay = '';
        }

        // 恢复进度或开启新局，并初始化静音的音频通道。
        onLoad() {
          const now = Date.now();
          const restored = this.loadProgress(now);
          this.state = restored != null ? restored : new (_crd && AlloyGameState === void 0 ? (_reportPossibleCrUseOfAlloyGameState({
            error: Error()
          }), AlloyGameState) : AlloyGameState)(now);

          if (restored) {
            this.status = '已恢复上次的营业进度';
          }

          this.saveProgress();
          const audioNode = new Node('WorkshopAudio');
          audioNode.active = false;
          this.node.addChild(audioNode);
          this.audio = audioNode.addComponent(AudioSource);
          this.audio.playOnAwake = false;
          this.audio.loop = true;
          this.audio.volume = 0.55;
          this.audio.clip = this.musicClip;
          audioNode.active = true;
        } // 从当前设备读取存档，兼容空存档、损坏数据和受限的浏览器环境。


        loadProgress(now) {
          if (!this.persistProgress) {
            return null;
          }

          try {
            const contents = sys.localStorage.getItem(PROGRESS_KEY);
            return contents ? (_crd && AlloyGameState === void 0 ? (_reportPossibleCrUseOfAlloyGameState({
              error: Error()
            }), AlloyGameState) : AlloyGameState).restore(JSON.parse(contents), now) : null;
          } catch {
            return null;
          }
        } // 一次性保存完整进度，设备存储不可用时继续当前局。


        saveProgress() {
          if (!this.persistProgress) {
            return;
          }

          try {
            sys.localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.state.getSnapshot()));
          } catch {// 浏览器限制存储时仍可完成当前试玩。
          }
        } // 订阅画布尺寸变化并摆放横屏或竖屏界面。


        onEnable() {
          view.on('canvas-resize', this.layout, this);
          this.layout();

          if (this.playfield) {
            this.playfield.node.active = true;
          }
        } // 停止接收尺寸事件，并清理进行中的拖拽和背景音乐。


        onDisable() {
          view.off('canvas-resize', this.layout, this);
          this.clearGesture();

          if (this.playfield) {
            this.playfield.node.active = false;
          }

          this.musicRequested = false;
          this.audio.stop();
        } // 隐藏覆盖操作区的性能统计，并通知 SDK 适配器进入可玩场景。


        start() {
          profiler == null || profiler.hideStats();
          this.track({
            type: 'game_start'
          });
        } // 更新体力恢复进度，只在显示值变化时刷新界面。


        update() {
          if (this.playfield) {
            this.refreshEnergy();
          }
        } // 根据画布比例装载对应的预制体，并按设计尺寸等比缩放。


        layout() {
          var _this$backdrop;

          const visible = view.getVisibleSize();

          if (visible.width <= 0 || visible.height <= 0) {
            return;
          }

          if ((_this$backdrop = this.backdrop) != null && _this$backdrop.spriteFrame) {
            const aspect = this.backdrop.spriteFrame.originalSize.width / this.backdrop.spriteFrame.originalSize.height;
            const width = Math.max(visible.width, visible.height * aspect);
            this.backdrop.getComponent(UITransform).setContentSize(width, width / aspect);
          }

          const portrait = visible.width / visible.height < 1.08;

          if (!this.playfield || this.portrait !== portrait) {
            const prefab = portrait ? this.portraitLayout : this.landscapeLayout;

            if (!prefab) {
              return;
            }

            this.clearGesture();

            if (this.playfield) {
              this.playfield.node.active = false;
              this.playfield.node.destroy();
            }

            const root = instantiate(prefab);
            this.node.addChild(root);
            this.playfield = root.getComponent(_crd && AlloyLayout === void 0 ? (_reportPossibleCrUseOfAlloyLayout({
              error: Error()
            }), AlloyLayout) : AlloyLayout);
            this.portrait = portrait;
            this.bindLayout(this.playfield);
            this.energyDisplay = '';
            this.refresh();
          }

          const design = this.playfield.getComponent(UITransform).contentSize;
          const scale = Math.min(visible.width / design.width, visible.height / design.height);
          this.playfield.node.setScale(scale, scale, 1);
        } // 绑定棋盘、订单、补货台升级和结算弹窗的触摸操作。


        bindLayout(field) {
          const board = field.board;
          const bounds = field.tiles.map(tile => tile.getComponent(UITransform).getBoundingBox());
          const left = Math.min(...bounds.map(rect => rect.xMin)) - 4;
          const right = Math.max(...bounds.map(rect => rect.xMax)) + 4;
          const bottom = Math.min(...bounds.map(rect => rect.yMin)) - 4;
          const top = Math.max(...bounds.map(rect => rect.yMax)) + 4;
          const transform = board.getComponent(UITransform);
          transform.setContentSize(right - left, top - bottom);
          transform.setAnchorPoint(-left / (right - left), -bottom / (top - bottom));
          board.on(Node.EventType.TOUCH_START, this.onBoardStart, this);
          board.on(Node.EventType.TOUCH_MOVE, this.onBoardMove, this);
          board.on(Node.EventType.TOUCH_END, this.onBoardEnd, this);
          board.on(Node.EventType.TOUCH_CANCEL, this.onBoardCancel, this);
          field.generateButton.node.on(Node.EventType.TOUCH_END, this.generate, this);
          field.routeButton.node.on(Node.EventType.TOUCH_END, this.changeSupplyRoute, this);
          field.upgradeButton.node.on(Node.EventType.TOUCH_END, this.upgradeGenerator, this);
          field.deliverButton.node.on(Node.EventType.TOUCH_END, this.deliver, this);
          field.recycleButton.node.on(Node.EventType.TOUCH_END, this.recycle, this);
          field.muteButton.node.on(Node.EventType.TOUCH_END, this.toggleMute, this);
          field.restartButton.node.on(Node.EventType.TOUCH_END, this.openRestart, this);
          field.dialogPrimary.node.on(Node.EventType.TOUCH_END, this.confirmDialog, this);
          field.dialogSecondary.node.on(Node.EventType.TOUCH_END, this.chooseDialogSecondary, this);
        } // 优先显示检查器绑定的图片，并从基础或关卡图集补齐未覆盖的阶数。


        paintItem(sprite, item) {
          var _ref, _ref2, _overrides, _this$itemAtlas, _this$campaignAtlas;

          if (!item) {
            sprite.spriteFrame = null;
            return;
          }

          const overrides = item.family === 'copper' ? this.copperItemFrames : item.family === 'quartz' ? this.quartzItemFrames : this.berryItemFrames;
          const name = (_crd && ALLOY_ITEM_FRAMES === void 0 ? (_reportPossibleCrUseOfALLOY_ITEM_FRAMES({
            error: Error()
          }), ALLOY_ITEM_FRAMES) : ALLOY_ITEM_FRAMES)[item.family][item.tier - 1];
          sprite.spriteFrame = (_ref = (_ref2 = (_overrides = overrides[item.tier - 1]) != null ? _overrides : (_this$itemAtlas = this.itemAtlas) == null ? void 0 : _this$itemAtlas.getSpriteFrame(name)) != null ? _ref2 : (_this$campaignAtlas = this.campaignAtlas) == null ? void 0 : _this$campaignAtlas.getSpriteFrame(name)) != null ? _ref : null;
        } // 用底图染色和文字颜色反馈按钮的可用状态。


        paintControl(button, text, emphasis) {
          button.color = emphasis != null ? emphasis : COLORS.inactive;
          const label = button.getComponentInChildren(Label);
          label.color = emphasis ? COLORS.activeText : COLORS.mutedText;
          label.string = text;
        } // 把棋盘、单品或双品订单和当前关卡进度更新到当前预制体。


        refresh() {
          const field = this.playfield;
          this.paintBoard();
          this.refreshEnergy();
          const {
            order,
            orderCount,
            nextItem,
            tutorial,
            roundNumber,
            roundOrderCount,
            roundOrderTotal
          } = this.state;
          this.paintItem(field.orderIcon, order.item);
          const displayedOrder = this.state.roundComplete ? orderCount : orderCount + 1;
          field.orderLabel.string = `订单 ${displayedOrder} · ${order.customer}`;
          field.orderItemLabel.string = (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(order.item);
          field.extraOrderIcon.node.active = !!order.extraItem;
          field.extraOrderLabel.node.active = !!order.extraItem;

          if (order.extraItem) {
            this.paintItem(field.extraOrderIcon, order.extraItem);
            field.extraOrderLabel.string = (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
              error: Error()
            }), getAlloyItemName) : getAlloyItemName)(order.extraItem);
          }

          field.orderRewardLabel.string = `+${order.reward} 体力 · +1 印章`;
          const stage = roundNumber <= (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length ? `第 ${roundNumber} 关` : '自由营业';
          field.roundProgress.string = `${stage} · ${roundOrderCount} / ${roundOrderTotal}`;
          this.paintControl(field.deliverButton, '交付', this.state.canDeliver() ? COLORS.green : null);
          this.refreshGenerator();
          this.paintItem(field.supplyIcon, nextItem);
          field.supplyLabel.string = `下一件  ${(_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(nextItem)}`;
          field.guideTitle.string = tutorial === 'complete' ? this.state.roundTitle : GUIDE[tutorial].title;
          field.guideInstruction.string = this.state.canSelectSupplyRoute && tutorial === 'complete' ? '点线路切换食材，交付赚印章升级。' : GUIDE[tutorial].instruction;
          field.statusLabel.string = this.status;
          this.paintControl(field.muteButton, this.muted ? '声音关' : '声音开', null);
          this.refreshDialog();
        } // 判断结算或重开确认是否正在占用操作区。


        get dialogOpen() {
          return this.restartPending || this.state.roundComplete;
        } // 显示关卡结算、剧情通关结果或重开确认。


        refreshDialog() {
          const field = this.playfield;
          field.roundDialog.active = this.dialogOpen;

          if (!this.dialogOpen) {
            return;
          }

          const {
            roundNumber,
            campaignComplete,
            roundOrderCount,
            nextRoundName
          } = this.state;
          const finale = campaignComplete && roundNumber === (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length;
          field.dialogTitle.string = this.restartPending ? '重新开局？' : finale ? '街角餐坊通关' : `${this.state.roundTitle}完成`;
          field.dialogDetail.string = this.restartPending ? '棋盘、订单和补货台会重置。' : `已交付 ${roundOrderCount} 单 · 下一站 ${nextRoundName}`;
          const continueText = roundNumber < (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length ? '进入下一关' : '自由营业';
          this.paintControl(field.dialogPrimary, this.restartPending ? '确认重开' : continueText, this.restartPending ? COLORS.orange : COLORS.green);
          this.paintControl(field.dialogSecondary, this.restartPending ? '取消' : '重新开局', null);
        } // 打开重开确认，当前操作完成后再允许重置。


        openRestart() {
          if (this.gesture || this.restartPending) {
            return;
          }

          this.restartPending = true;
          this.refreshDialog();
        } // 取消重开确认，或从结算页进入重开确认。


        chooseDialogSecondary() {
          if (this.restartPending) {
            this.restartPending = false;
            this.refreshDialog();
          } else if (this.state.roundComplete) {
            this.openRestart();
          }
        } // 确认重置或前往下一关，并在更新存档后发送对应事件。


        confirmDialog() {
          let event;

          if (this.restartPending) {
            event = {
              type: 'game_restarted',
              previousOrderCount: this.state.orderCount
            };
            this.state = new (_crd && AlloyGameState === void 0 ? (_reportPossibleCrUseOfAlloyGameState({
              error: Error()
            }), AlloyGameState) : AlloyGameState)(Date.now());
            this.restartPending = false;
            this.selected = -1;
            this.status = '新的一局开始了';
          } else if (this.state.continueRound()) {
            event = {
              type: 'round_continued',
              roundNumber: this.state.roundNumber,
              orderCount: this.state.orderCount
            };
            this.selected = -1;
            this.status = this.state.roundNumber === 2 ? '已解锁莓果和定向补货' : '新一轮营业已开启';
          } else {
            return;
          }

          this.unlockAudio();
          this.saveProgress();
          this.refresh();
          this.track(event);
        } // 显示补货、线路和升级按钮的当前状态及升级费用。


        refreshGenerator() {
          const field = this.playfield;
          const {
            generatorLevel,
            upgradeStamps,
            nextUpgradeCost,
            nextUpgradeChapter,
            generatorUpgradeUnlocked,
            canSelectSupplyRoute,
            supplyRoute
          } = this.state;
          const ready = !this.dialogOpen && this.state.energy > 0 && this.state.board.indexOf(null) !== -1;
          field.generatorTitle.string = `补货台 Lv.${generatorLevel} · ${upgradeStamps} 印章`;
          this.paintControl(field.generateButton, '补货 −1', ready ? COLORS.orange : null);
          field.routeButton.node.active = canSelectSupplyRoute;
          this.paintControl(field.routeButton, `线路 ${(_crd && ALLOY_ROUTE_LABELS === void 0 ? (_reportPossibleCrUseOfALLOY_ROUTE_LABELS({
            error: Error()
          }), ALLOY_ROUTE_LABELS) : ALLOY_ROUTE_LABELS)[supplyRoute]}`, COLORS.green);
          const upgradeLabel = nextUpgradeCost === null ? '已满级' : generatorUpgradeUnlocked ? `升级 · ${nextUpgradeCost} 印章` : `第 ${nextUpgradeChapter} 关可升级`;
          const canUpgrade = !this.dialogOpen && generatorUpgradeUnlocked && nextUpgradeCost !== null && upgradeStamps >= nextUpgradeCost;
          this.paintControl(field.upgradeButton, upgradeLabel, canUpgrade ? COLORS.orange : null);
        } // 切换定向补货线路，保存选择并更新下一件预览。


        changeSupplyRoute() {
          if (this.dialogOpen || this.gesture) {
            return;
          }

          const route = this.state.cycleSupplyRoute();

          if (!route) {
            return;
          }

          this.unlockAudio();
          this.status = `补货线路 · ${(_crd && ALLOY_ROUTE_LABELS === void 0 ? (_reportPossibleCrUseOfALLOY_ROUTE_LABELS({
            error: Error()
          }), ALLOY_ROUTE_LABELS) : ALLOY_ROUTE_LABELS)[route]}`;
          this.saveProgress();
          this.refresh();
          this.track({
            type: 'supply_route_changed',
            route,
            roundNumber: this.state.roundNumber
          });
        } // 扣除印章提升补货产出，保存等级并通知 SDK。


        upgradeGenerator() {
          if (this.dialogOpen || this.gesture) {
            return;
          }

          const level = this.state.upgradeGenerator();

          if (level === null) {
            this.status = this.state.nextUpgradeCost === null ? '补货台已满级' : this.state.generatorUpgradeUnlocked ? '交付订单可获得升级印章' : '推进关卡后可升级补货台';
            this.refresh();
            return;
          }

          this.unlockAudio();
          this.status = level === 2 ? '升级成功 · 每三次产出高一阶' : level === 3 ? '升级成功 · 补货从二阶开始' : '升级成功 · 每三次产出三阶道具';
          this.saveProgress();
          this.refresh();
          this.track({
            type: 'generator_upgraded',
            level,
            roundNumber: this.state.roundNumber,
            remainingStamps: this.state.upgradeStamps
          });
        } // 更新体力恢复计时和预制体中的体力格。


        refreshEnergy() {
          const now = Date.now();
          this.state.recoverEnergy(now);
          const {
            energy
          } = this.state;
          const next = this.state.secondsUntilEnergy(now);
          const display = `体力 ${energy} / ${_crd && ENERGY_CAPACITY === void 0 ? (_reportPossibleCrUseOfENERGY_CAPACITY({
            error: Error()
          }), ENERGY_CAPACITY) : ENERGY_CAPACITY}   ·   ${next > 0 ? `${next} 秒后 +1` : '已满'}`;

          if (display === this.energyDisplay) {
            return;
          }

          const field = this.playfield;
          this.energyDisplay = display;
          field.energyLabel.string = display;
          field.energyPips.forEach((pip, index) => {
            pip.color = index < energy ? COLORS.green : COLORS.inactive;
          });
          this.refreshGenerator();
        } // 更新每格道具、可合成目标和教程高亮。


        paintBoard() {
          var _this$gesture;

          const field = this.playfield;
          const {
            board,
            tutorial
          } = this.state;
          const orderCell = tutorial === 'deliver' ? this.state.getOrderCell() : -1;
          const dragging = (_this$gesture = this.gesture) != null && _this$gesture.dragging ? this.gesture : null;

          for (let index = 0; index < board.length; index += 1) {
            const item = board[index];
            const hovered = (dragging == null ? void 0 : dragging.hover) === index;
            const validTarget = !!hovered && dragging.from !== index && (!item || this.state.canMerge(dragging.from, index));
            const tutorialPair = (item == null ? void 0 : item.family) === 'copper' && item.tier === 1 && tutorial === 'merge';
            const highlight = index === this.selected || validTarget || index === orderCell || tutorialPair;
            const visibleItem = (dragging == null ? void 0 : dragging.from) === index ? null : item;
            field.tiles[index].color = hovered && !validTarget ? COLORS.blocked : item ? COLORS.filledTile : COLORS.emptyTile;
            field.focusFrames[index].node.active = highlight;
            this.paintItem(field.items[index], visibleItem);
            field.tiers[index].string = visibleItem ? `T${visibleItem.tier}` : '';
          }

          this.paintControl(field.recycleButton, '回收', this.state.canRecycle(this.selected) ? COLORS.orange : null);
        } // 将触点从画布坐标转换到棋盘节点坐标。


        getBoardPoint(event) {
          const point = event.getUILocation();
          return this.playfield.board.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
        } // 用预制体格子的实际位置和尺寸判断落点。


        getCell(point) {
          const location = new Vec2(point.x, point.y);
          return this.playfield.tiles.findIndex(tile => tile.getComponent(UITransform).getBoundingBox().contains(location));
        } // 记录单指棋盘操作的起点，在弹窗和并发触点期间忽略输入。


        onBoardStart(event) {
          if (this.gesture || this.dialogOpen) {
            return;
          }

          const point = this.getBoardPoint(event);
          const from = this.getCell(point);
          const touchId = event.getID();

          if (from !== -1 && touchId !== null) {
            this.gesture = {
              touchId,
              from,
              x: point.x,
              y: point.y,
              dragging: false,
              hover: from
            };
          }
        } // 超过拖动阈值后显示物品预览，并更新候选目标。


        onBoardMove(event) {
          const gesture = this.gesture;

          if (!gesture || gesture.touchId !== event.getID()) {
            return;
          }

          const item = this.state.board[gesture.from];

          if (!item) {
            return;
          }

          const point = this.getBoardPoint(event);
          const firstDrag = !gesture.dragging;

          if (firstDrag && Math.hypot(point.x - gesture.x, point.y - gesture.y) < 10) {
            return;
          }

          if (firstDrag) {
            gesture.dragging = true;
            this.selected = -1;
            this.playfield.dragPreview.node.active = true;
            this.paintItem(this.playfield.dragPreview, item);
          }

          this.playfield.dragPreview.node.setPosition(point.x, point.y, 0);
          const hover = this.getCell(point);

          if (firstDrag || hover !== gesture.hover) {
            gesture.hover = hover;
            this.paintBoard();
          }
        } // 释放时提交拖拽，或用两次点击完成选择和落格。


        onBoardEnd(event) {
          const gesture = this.gesture;

          if (!gesture || gesture.touchId !== event.getID()) {
            return;
          }

          const target = this.getCell(this.getBoardPoint(event));
          this.clearGesture();

          if (gesture.dragging) {
            if (target !== -1 && target !== gesture.from) {
              this.drop(gesture.from, target);
            }
          } else if (target === gesture.from) {
            const item = this.state.board[target];

            if (this.selected !== -1 && target !== this.selected && (!item || this.state.canMerge(this.selected, target))) {
              this.drop(this.selected, target);
            } else if (item) {
              this.unlockAudio();
              this.selected = this.selected === target ? -1 : target;
              this.status = this.selected === -1 ? '已取消选择' : `已选中 ${(_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
                error: Error()
              }), getAlloyItemName) : getAlloyItemName)(item)}`;
            }
          }

          this.refresh();
        } // 触点取消或从棋盘外释放时清理预览，保留原物品。


        onBoardCancel(event) {
          var _this$gesture2;

          if (((_this$gesture2 = this.gesture) == null ? void 0 : _this$gesture2.touchId) === event.getID()) {
            this.clearGesture();
            this.paintBoard();
          }
        } // 隐藏跟手物品并释放当前棋盘操作。


        clearGesture() {
          var _this$playfield;

          this.gesture = null;

          if ((_this$playfield = this.playfield) != null && _this$playfield.dragPreview) {
            this.playfield.dragPreview.node.active = false;
          }
        } // 提交落格并保存棋盘，合成时播放音效并发送事件。


        drop(from, to) {
          const result = this.state.drop(from, to);

          if (result === 'blocked') {
            this.status = '只能放入空格，或合成同类同阶物品。';
            return;
          }

          this.unlockAudio();
          this.selected = -1;
          const item = this.state.board[to];
          this.status = result === 'merge' ? `合成成功 · ${(_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(item)}` : '物品已移动';
          this.saveProgress();

          if (result === 'merge') {
            this.playEffect(this.mergeClip);
            this.track({
              type: 'item_merged',
              item: { ...item
              }
            });
          }
        } // 补货成功后保存进度，并反馈体力不足或棋盘已满的情况。


        generate() {
          if (this.gesture || this.dialogOpen) {
            return;
          }

          const result = this.state.generate(Date.now());

          if (typeof result === 'number') {
            this.unlockAudio();
            this.selected = -1;
            const item = this.state.board[result];
            this.status = `补货成功 · ${(_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
              error: Error()
            }), getAlloyItemName) : getAlloyItemName)(item)}`;
            this.saveProgress();
            this.playEffect(this.generateClip);
            this.track({
              type: 'item_generated',
              item: { ...item
              },
              energy: this.state.energy
            });
          } else {
            this.status = result === 'full' ? '棋盘已满，先合成、交付或回收物品。' : '体力不足，请等待恢复。';
          }

          this.refresh();
        } // 一次性交付订单的全部物品，保存奖励并发送结算或通关事件。


        deliver() {
          if (this.gesture || this.dialogOpen) {
            return;
          }

          const tutorialWasActive = this.state.tutorial !== 'complete';
          const completed = this.state.deliver(Date.now());

          if (completed) {
            this.unlockAudio();
            this.selected = -1;
            this.status = tutorialWasActive ? '新手引导完成 · 下一张订单已到达' : `已交付 · +${completed.reward} 体力 · +1 印章`;
            this.saveProgress();
            this.playEffect(this.orderClip);
            this.track({
              type: 'order_delivered',
              orderCount: this.state.orderCount,
              item: { ...completed.item
              },
              ...(completed.extraItem ? {
                extraItem: { ...completed.extraItem
                }
              } : {})
            });

            if (tutorialWasActive) {
              this.track({
                type: 'tutorial_completed'
              });
            }

            if (this.state.roundComplete) {
              this.track({
                type: 'round_completed',
                roundNumber: this.state.roundNumber,
                orderCount: this.state.orderCount
              });

              if (this.state.roundNumber === (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
                error: Error()
              }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length) {
                this.track({
                  type: 'campaign_completed',
                  roundNumber: this.state.roundNumber,
                  orderCount: this.state.orderCount
                });
              }
            }
          } else {
            const {
              item,
              extraItem
            } = this.state.order;
            this.status = extraItem ? '棋盘上需要同时备齐两件物品。' : `还需要 ${(_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
              error: Error()
            }), getAlloyItemName) : getAlloyItemName)(item)}`;
          }

          this.refresh();
        } // 回收选中的道具并保存棋盘，在教程中提示可回收的条件。


        recycle() {
          if (this.gesture || this.dialogOpen) {
            return;
          }

          if (this.state.recycle(this.selected)) {
            this.unlockAudio();
            this.selected = -1;
            this.status = '物品已回收';
            this.saveProgress();
          } else {
            this.status = this.state.tutorial === 'complete' || this.state.board.indexOf(null) === -1 ? '先点选要回收的物品。' : '完成首单或棋盘填满后可回收。';
          }

          this.refresh();
        } // 切换音乐和音效，关闭声音时立即暂停背景音乐。


        toggleMute() {
          this.muted = !this.muted;

          if (this.muted) {
            this.musicRequested = false;
            this.audio.pause();
          } else {
            this.unlockAudio();
          }

          this.paintControl(this.playfield.muteButton, this.muted ? '声音关' : '声音开', null);
        } // 只在有效点击或触摸的回调中开启音频并同步启动音乐。


        unlockAudio() {
          this.audioUnlocked = true;

          if (!this.muted && this.musicClip && !this.musicRequested) {
            this.musicRequested = true;
            this.audio.play();
          }
        } // 在音频已解锁且未静音时播放检查器绑定的音效。


        playEffect(clip) {
          if (this.audioUnlocked && !this.muted && clip) {
            this.audio.playOneShot(clip, 0.8);
          }
        } // 转发可选的 SDK 事件，隔离平台回调错误与玩法流程。


        track(event) {
          try {
            var _this$sdkAdapter;

            (_this$sdkAdapter = this.sdkAdapter) == null || _this$sdkAdapter.trackEvent(event);
          } catch (error) {
            console.warn('[AlloyGame] SDK 事件发送失败', event.type, error);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "musicClip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "generateClip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mergeClip", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "orderClip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sdkAdapter", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "landscapeLayout", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "portraitLayout", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "backdrop", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "itemAtlas", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "campaignAtlas", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "copperItemFrames", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "quartzItemFrames", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "berryItemFrames", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "persistProgress", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=22d5b51bbb34c60bc305a849d6aef51e3d1263fb.js.map