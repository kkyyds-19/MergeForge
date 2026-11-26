System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioClip, AudioSource, Color, Component, Graphics, Label, Node, profiler, UITransform, Vec3, view, ALLOY_COLORS, createAlloyLabel, createAlloyNode, createAlloyPlate, paintAlloyItem, paintAlloyPlate, AlloyGameState, BOARD_COLUMNS, BOARD_ROWS, ENERGY_CAPACITY, getAlloyItemName, AlloySdkAdapter, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, C, CENTER, CELL_SIZE, CELL_STEP, GUIDE, AlloyGame;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfALLOY_COLORS(extras) {
    _reporterNs.report("ALLOY_COLORS", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateAlloyLabel(extras) {
    _reporterNs.report("createAlloyLabel", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateAlloyNode(extras) {
    _reporterNs.report("createAlloyNode", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateAlloyPlate(extras) {
    _reporterNs.report("createAlloyPlate", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpaintAlloyItem(extras) {
    _reporterNs.report("paintAlloyItem", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpaintAlloyPlate(extras) {
    _reporterNs.report("paintAlloyPlate", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyPlate(extras) {
    _reporterNs.report("AlloyPlate", "./AlloyArt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyGameState(extras) {
    _reporterNs.report("AlloyGameState", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBOARD_COLUMNS(extras) {
    _reporterNs.report("BOARD_COLUMNS", "./AlloyGameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBOARD_ROWS(extras) {
    _reporterNs.report("BOARD_ROWS", "./AlloyGameState", _context.meta, extras);
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
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Node = _cc.Node;
      profiler = _cc.profiler;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      view = _cc.view;
    }, function (_unresolved_2) {
      ALLOY_COLORS = _unresolved_2.ALLOY_COLORS;
      createAlloyLabel = _unresolved_2.createAlloyLabel;
      createAlloyNode = _unresolved_2.createAlloyNode;
      createAlloyPlate = _unresolved_2.createAlloyPlate;
      paintAlloyItem = _unresolved_2.paintAlloyItem;
      paintAlloyPlate = _unresolved_2.paintAlloyPlate;
    }, function (_unresolved_3) {
      AlloyGameState = _unresolved_3.AlloyGameState;
      BOARD_COLUMNS = _unresolved_3.BOARD_COLUMNS;
      BOARD_ROWS = _unresolved_3.BOARD_ROWS;
      ENERGY_CAPACITY = _unresolved_3.ENERGY_CAPACITY;
      getAlloyItemName = _unresolved_3.getAlloyItemName;
    }, function (_unresolved_4) {
      AlloySdkAdapter = _unresolved_4.AlloySdkAdapter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b938dki/EhNVbckTw4a6DIE", "AlloyGame", undefined);

      __checkObsolete__(['_decorator', 'AudioClip', 'AudioSource', 'Color', 'Component', 'EventTouch', 'Graphics', 'Label', 'Node', 'profiler', 'UITransform', 'Vec3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);
      C = _crd && ALLOY_COLORS === void 0 ? (_reportPossibleCrUseOfALLOY_COLORS({
        error: Error()
      }), ALLOY_COLORS) : ALLOY_COLORS;
      CENTER = Label.HorizontalAlign.CENTER;
      CELL_SIZE = 82;
      CELL_STEP = 88;
      GUIDE = {
        generate: {
          title: '1 / 3   采集矿物',
          instruction: '点击右侧或下方高亮的采集按钮。'
        },
        merge: {
          title: '2 / 3   合成铜锭',
          instruction: '将一块铜矿拖到另一块铜矿上。'
        },
        deliver: {
          title: '3 / 3   交付订单',
          instruction: '点击交付，提交铜锭并领取体力。'
        },
        complete: {
          title: '工坊操作',
          instruction: '同类同阶可合成，点选多余物品可回收。'
        }
      };

      _export("AlloyGame", AlloyGame = (_dec = ccclass('AlloyGame'), _dec2 = property({
        type: AudioClip,
        tooltip: '有效操作后开始循环播放的背景音乐。'
      }), _dec3 = property({
        type: AudioClip,
        tooltip: '成功采集矿物时播放的音效。'
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
      }), _dec(_class = (_class2 = class AlloyGame extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "musicClip", _descriptor, this);

          _initializerDefineProperty(this, "generateClip", _descriptor2, this);

          _initializerDefineProperty(this, "mergeClip", _descriptor3, this);

          _initializerDefineProperty(this, "orderClip", _descriptor4, this);

          _initializerDefineProperty(this, "sdkAdapter", _descriptor5, this);

          this.state = void 0;
          this.audio = void 0;
          this.audioUnlocked = false;
          this.musicRequested = false;
          this.muted = false;
          this.content = void 0;
          this.backdrop = void 0;
          this.portrait = void 0;
          this.boardNode = void 0;
          this.cells = [];
          this.selected = -1;
          this.gesture = null;
          this.ghost = void 0;
          this.ghostIcon = void 0;
          this.energyLabel = void 0;
          this.energyMeter = void 0;
          this.orderLabel = void 0;
          this.orderItemLabel = void 0;
          this.orderRewardLabel = void 0;
          this.orderIcon = void 0;
          this.supplyLabel = void 0;
          this.supplyIcon = void 0;
          this.guideTitle = void 0;
          this.guideInstruction = void 0;
          this.statusLabel = void 0;
          this.deliverControl = void 0;
          this.generateControl = void 0;
          this.recycleControl = void 0;
          this.muteControl = void 0;
          this.status = '等待采集';
          this.energyDisplay = '';
        }

        // 初始化棋盘和音频通道，确保载入时没有任何自动播放。
        onLoad() {
          this.state = new (_crd && AlloyGameState === void 0 ? (_reportPossibleCrUseOfAlloyGameState({
            error: Error()
          }), AlloyGameState) : AlloyGameState)(Date.now());
          var audioNode = new Node('WorkshopAudio');
          audioNode.active = false;
          this.node.addChild(audioNode);
          this.audio = audioNode.addComponent(AudioSource);
          this.audio.playOnAwake = false;
          this.audio.loop = true;
          this.audio.volume = 0.55;
          this.audio.clip = this.musicClip;
          audioNode.active = true;
        } // 订阅画布尺寸变化并摆放横屏或竖屏界面。


        onEnable() {
          view.on('canvas-resize', this.layout, this);
          this.layout();

          if (this.content) {
            this.content.active = true;
          }
        } // 停止接收尺寸事件，并清理进行中的拖拽和背景音乐。


        onDisable() {
          view.off('canvas-resize', this.layout, this);
          this.clearGesture();

          if (this.content) {
            this.content.active = false;
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
          if (this.content) {
            this.refreshEnergy();
          }
        } // 按可用视口选择布局，缩放整套控件并重绘背景。


        layout() {
          var visible = view.getVisibleSize();

          if (visible.width <= 0 || visible.height <= 0) {
            return;
          }

          var portrait = visible.width / visible.height < 1.08;
          var width = portrait ? 620 : 1160;
          var height = portrait ? 1090 : 688;

          if (!this.backdrop) {
            this.backdrop = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
              error: Error()
            }), createAlloyNode) : createAlloyNode)(this.node, 'Backdrop', 0, 0, 0, 0).addComponent(Graphics);
          }

          this.backdrop.clear();
          this.backdrop.fillColor = Color.fromHEX(new Color(), C.background);
          this.backdrop.rect(-visible.width / 2, -visible.height / 2, visible.width, visible.height);
          this.backdrop.fill();

          if (!this.content || this.portrait !== portrait) {
            this.clearGesture();

            if (this.content) {
              this.content.active = false;
              this.content.destroy();
            }

            this.content = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
              error: Error()
            }), createAlloyNode) : createAlloyNode)(this.node, 'AlloyPlayfield', 0, 0, width, height);
            this.portrait = portrait;
            this.buildHud(this.content, portrait);
            this.buildBoard(this.content, portrait);
            this.buildOrder(this.content, portrait);
            this.buildGenerator(this.content, portrait);
            this.buildGuide(this.content, portrait);
            this.refresh();
          }

          var scale = Math.min(visible.width / width, visible.height / height);
          this.content.setScale(scale, scale, 1);
        } // 创建标题、体力读数和音频开关。


        buildHud(parent, portrait) {
          var titleX = portrait ? -86 : -326;
          var topY = portrait ? 497 : 292;
          (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(parent, 'Title', '晶核工坊', titleX, topY, 426, 58, 46, C.text, undefined, true);
          (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(parent, 'Subtitle', '采集矿物 · 合成晶核 · 完成委托', titleX, topY - 40, 426, 26, 19, C.secondary);
          var energy = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, 'EnergyCard', portrait ? -95 : 238, portrait ? 405 : 285, 405, 62, C.panel, C.border);
          this.energyLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(energy.node, 'EnergyValue', '', 0, 11, 365, 25, 18, C.aqua);
          this.energyMeter = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
            error: Error()
          }), createAlloyNode) : createAlloyNode)(energy.node, 'EnergyMeter', 0, -14, 365, 10).addComponent(Graphics);
          this.energyDisplay = '';
          this.muteControl = this.makeControl(parent, 'AudioToggle', portrait ? 225 : 509, topY, 110, 44, this.toggleMute);
        } // 构建棋盘格、物品图标、回收操作和跟手预览。


        buildBoard(parent, portrait) {
          var panel = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, 'BoardCard', portrait ? 0 : -258, portrait ? 112 : -44, 594, portrait ? 502 : 550, C.panel, C.border, 22);
          var titleY = portrait ? 220 : 236;
          (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(panel.node, 'BoardTitle', '合成棋盘', -132, titleY, 258, 37, 27, C.text, undefined, true);
          this.recycleControl = this.makeControl(panel.node, 'Recycle', 219, titleY, 114, 36, this.recycle);
          this.boardNode = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
            error: Error()
          }), createAlloyNode) : createAlloyNode)(panel.node, 'BoardInput', 0, portrait ? -23 : -13, (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
            error: Error()
          }), BOARD_COLUMNS) : BOARD_COLUMNS) * CELL_STEP, (_crd && BOARD_ROWS === void 0 ? (_reportPossibleCrUseOfBOARD_ROWS({
            error: Error()
          }), BOARD_ROWS) : BOARD_ROWS) * CELL_STEP);
          this.boardNode.on(Node.EventType.TOUCH_START, this.onBoardStart, this);
          this.boardNode.on(Node.EventType.TOUCH_MOVE, this.onBoardMove, this);
          this.boardNode.on(Node.EventType.TOUCH_END, this.onBoardEnd, this);
          this.boardNode.on(Node.EventType.TOUCH_CANCEL, this.onBoardCancel, this);
          this.cells = [];

          for (var row = 0; row < (_crd && BOARD_ROWS === void 0 ? (_reportPossibleCrUseOfBOARD_ROWS({
            error: Error()
          }), BOARD_ROWS) : BOARD_ROWS); row += 1) {
            for (var column = 0; column < (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
              error: Error()
            }), BOARD_COLUMNS) : BOARD_COLUMNS); column += 1) {
              var index = row * (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
                error: Error()
              }), BOARD_COLUMNS) : BOARD_COLUMNS) + column;
              var x = (column - ((_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
                error: Error()
              }), BOARD_COLUMNS) : BOARD_COLUMNS) - 1) / 2) * CELL_STEP;
              var y = (((_crd && BOARD_ROWS === void 0 ? (_reportPossibleCrUseOfBOARD_ROWS({
                error: Error()
              }), BOARD_ROWS) : BOARD_ROWS) - 1) / 2 - row) * CELL_STEP;
              var plate = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
                error: Error()
              }), createAlloyPlate) : createAlloyPlate)(this.boardNode, "Cell-" + index, x, y, CELL_SIZE, CELL_SIZE, C.inset, C.border, 13);
              var icon = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
                error: Error()
              }), createAlloyNode) : createAlloyNode)(plate.node, 'Item', 0, 3, 56, 56).addComponent(Graphics);
              var tier = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
                error: Error()
              }), createAlloyLabel) : createAlloyLabel)(plate.node, 'Tier', '', 0, -28, 76, 19, 13, C.secondary, CENTER);
              this.cells.push({
                plate,
                icon,
                tier
              });
            }
          }

          this.ghost = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(this.boardNode, 'DragPreview', 0, 0, CELL_SIZE, CELL_SIZE, C.panel, C.aqua, 13);
          this.ghostIcon = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
            error: Error()
          }), createAlloyNode) : createAlloyNode)(this.ghost.node, 'DragItem', 0, 0, 64, 64).addComponent(Graphics);
          this.ghost.node.active = false;
        } // 构建当前客户、所需物品、体力奖励及交付按钮。


        buildOrder(parent, portrait) {
          var width = portrait ? 594 : 466;
          var card = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, 'OrderCard', portrait ? 0 : 286, portrait ? -222 : 144, width, portrait ? 138 : 174, C.panel, C.border, 22);
          var left = -width / 2;
          var icon = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(card.node, 'OrderItemPlate', left + 57, portrait ? -6 : -10, 68, 68, C.inset, C.border, 14);
          this.orderIcon = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
            error: Error()
          }), createAlloyNode) : createAlloyNode)(icon.node, 'OrderItem', 0, 0, 56, 56).addComponent(Graphics);
          this.orderLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'OrderCustomer', '', left + 181, portrait ? 45 : 58, 322, 30, 21, C.text, undefined, true);
          this.orderItemLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'OrderRequirement', '', left + 206, portrait ? 10 : 11, 204, 30, 24, C.text, undefined, true);
          this.orderRewardLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'OrderReward', '', left + 204, -26, 200, 26, 17, C.orange);
          this.deliverControl = this.makeControl(card.node, 'Deliver', width / 2 - 87, portrait ? -15 : -13, 132, 49, this.deliver);
        } // 构建采集台、下一种矿物提示和采集按钮。


        buildGenerator(parent, portrait) {
          var width = portrait ? 594 : 466;
          var card = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, 'GeneratorCard', portrait ? 0 : 286, portrait ? -360 : -28, width, portrait ? 113 : 145, C.panel, C.border, 22);
          var left = -width / 2;
          var icon = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(card.node, 'SupplyItemPlate', left + 57, 0, 68, 68, C.inset, C.border, 14);
          this.supplyIcon = (_crd && createAlloyNode === void 0 ? (_reportPossibleCrUseOfcreateAlloyNode({
            error: Error()
          }), createAlloyNode) : createAlloyNode)(icon.node, 'SupplyItem', 0, 0, 56, 56).addComponent(Graphics);
          (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'GeneratorTitle', '矿物采集台', left + 200, 17, 192, 32, 23, C.text, undefined, true);
          this.supplyLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'GeneratorNext', '', left + 200, -17, 192, 25, 17, C.secondary);
          this.generateControl = this.makeControl(card.node, 'Generate', width / 2 - 87, 0, 132, 49, this.generate);
        } // 建立引导标题、当前操作说明和反馈提示区。


        buildGuide(parent, portrait) {
          var width = portrait ? 594 : 466;
          var card = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, 'GuideCard', portrait ? 0 : 286, portrait ? -482 : -202, width, portrait ? 105 : 168, C.panel, C.border, 22);
          this.guideTitle = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'GuideStep', '', 0, portrait ? 31 : 48, width - 46, 32, 22, C.aqua, undefined, true);
          this.guideInstruction = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'GuideInstruction', '', 0, portrait ? 0 : 8, width - 46, 31, 19, C.text);
          this.statusLabel = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(card.node, 'Feedback', '', 0, portrait ? -31 : -43, width - 46, 28, 17, C.secondary);
        } // 创建仅在手指或鼠标在按钮内释放时触发的控件。


        makeControl(parent, name, x, y, width, height, action) {
          var plate = (_crd && createAlloyPlate === void 0 ? (_reportPossibleCrUseOfcreateAlloyPlate({
            error: Error()
          }), createAlloyPlate) : createAlloyPlate)(parent, name, x, y, width, height, C.inset, C.border, 12);
          plate.node.on(Node.EventType.TOUCH_END, action, this);
          var label = (_crd && createAlloyLabel === void 0 ? (_reportPossibleCrUseOfcreateAlloyLabel({
            error: Error()
          }), createAlloyLabel) : createAlloyLabel)(plate.node, 'Caption', '', 0, 0, width - 10, height - 4, 19, C.text, CENTER, true);
          return {
            plate,
            label,
            width,
            height
          };
        } // 根据操作可用性与高亮色更新按钮样式。


        paintControl(control, text, emphasis) {
          (_crd && paintAlloyPlate === void 0 ? (_reportPossibleCrUseOfpaintAlloyPlate({
            error: Error()
          }), paintAlloyPlate) : paintAlloyPlate)(control.plate.graphics, control.width, control.height, emphasis != null ? emphasis : C.inset, emphasis != null ? emphasis : C.border, 12);
          control.label.color = Color.fromHEX(new Color(), emphasis ? C.darkText : C.secondary);
          control.label.string = text;
        } // 重绘资源、订单和引导提示，展示最新的玩法状态。


        refresh() {
          this.paintBoard();
          this.refreshEnergy();
          var {
            order,
            orderCount,
            nextFamily,
            tutorial
          } = this.state;
          (_crd && paintAlloyItem === void 0 ? (_reportPossibleCrUseOfpaintAlloyItem({
            error: Error()
          }), paintAlloyItem) : paintAlloyItem)(this.orderIcon, order.item);
          this.orderLabel.string = "\u8BA2\u5355 " + (orderCount + 1) + " \xB7 " + order.customer;
          this.orderItemLabel.string = (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(order.item);
          this.orderRewardLabel.string = "\u5956\u52B1 +" + order.reward + " \u4F53\u529B";
          this.paintControl(this.deliverControl, '交付', this.state.canDeliver() ? C.aqua : null);
          this.refreshGenerator();
          var supply = {
            family: nextFamily,
            tier: 1
          };
          (_crd && paintAlloyItem === void 0 ? (_reportPossibleCrUseOfpaintAlloyItem({
            error: Error()
          }), paintAlloyItem) : paintAlloyItem)(this.supplyIcon, supply);
          this.supplyLabel.string = "\u4E0B\u4E00\u4EF6  " + (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(supply);
          this.guideTitle.string = GUIDE[tutorial].title;
          this.guideInstruction.string = GUIDE[tutorial].instruction;
          this.statusLabel.string = this.status;
          this.paintControl(this.muteControl, this.muted ? '声音关' : '声音开', null);
        } // 根据体力和空格情况刷新采集按钮。


        refreshGenerator() {
          var ready = this.state.energy > 0 && this.state.board.indexOf(null) !== -1;
          this.paintControl(this.generateControl, '采集 −1', ready ? C.orange : null);
        } // 更新体力恢复计时，并仅在读数变化时重绘体力条。


        refreshEnergy() {
          var now = Date.now();
          this.state.recoverEnergy(now);
          var {
            energy
          } = this.state;
          var next = this.state.secondsUntilEnergy(now);
          var display = "\u4F53\u529B " + energy + " / " + (_crd && ENERGY_CAPACITY === void 0 ? (_reportPossibleCrUseOfENERGY_CAPACITY({
            error: Error()
          }), ENERGY_CAPACITY) : ENERGY_CAPACITY) + "   \xB7   " + (next > 0 ? next + " \u79D2\u540E +1" : '已满');

          if (display === this.energyDisplay) {
            return;
          }

          this.energyDisplay = display;
          this.energyLabel.string = display;
          this.energyMeter.clear();

          for (var index = 0; index < (_crd && ENERGY_CAPACITY === void 0 ? (_reportPossibleCrUseOfENERGY_CAPACITY({
            error: Error()
          }), ENERGY_CAPACITY) : ENERGY_CAPACITY); index += 1) {
            this.energyMeter.fillColor = Color.fromHEX(new Color(), index < energy ? C.aqua : C.border);
            this.energyMeter.roundRect(-182 + index * 30.5, -3.5, 26, 7, 3);
            this.energyMeter.fill();
          }

          this.refreshGenerator();
        } // 更新物品剪影、选中状态、合成目标和引导边框。


        paintBoard() {
          var {
            board,
            tutorial
          } = this.state;
          var orderCell = tutorial === 'deliver' ? this.state.getOrderCell() : -1;

          for (var index = 0; index < board.length; index += 1) {
            var _this$gesture;

            var item = board[index];
            var cell = this.cells[index];
            var dragging = (_this$gesture = this.gesture) != null && _this$gesture.dragging ? this.gesture : null;
            var hovered = (dragging == null ? void 0 : dragging.hover) === index;
            var validTarget = !!hovered && dragging.from !== index && (!item || this.state.canMerge(dragging.from, index));
            var tutorialPair = (item == null ? void 0 : item.family) === 'copper' && item.tier === 1 && tutorial === 'merge';
            var highlight = index === this.selected || validTarget || index === orderCell || tutorialPair;
            var visibleItem = (dragging == null ? void 0 : dragging.from) === index ? null : item;
            (_crd && paintAlloyPlate === void 0 ? (_reportPossibleCrUseOfpaintAlloyPlate({
              error: Error()
            }), paintAlloyPlate) : paintAlloyPlate)(cell.plate.graphics, CELL_SIZE, CELL_SIZE, highlight ? '#24364A' : item ? '#202F40' : C.inset, highlight ? C.aqua : hovered ? C.orange : C.border, 13);
            (_crd && paintAlloyItem === void 0 ? (_reportPossibleCrUseOfpaintAlloyItem({
              error: Error()
            }), paintAlloyItem) : paintAlloyItem)(cell.icon, visibleItem);
            cell.tier.string = visibleItem ? "T" + visibleItem.tier : '';
          }

          var canRecycle = this.selected !== -1 && tutorial === 'complete';
          this.paintControl(this.recycleControl, '回收', canRecycle ? C.orange : null);
        } // 将触点的 UI 坐标换算为棋盘局部坐标。


        getBoardPoint(event) {
          var point = event.getUILocation();
          return this.boardNode.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
        } // 按棋盘坐标返回格子索引，格子之间的缝隙不参与落点判定。


        getCell(point) {
          var colX = point.x + (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
            error: Error()
          }), BOARD_COLUMNS) : BOARD_COLUMNS) * CELL_STEP / 2;
          var rowY = (_crd && BOARD_ROWS === void 0 ? (_reportPossibleCrUseOfBOARD_ROWS({
            error: Error()
          }), BOARD_ROWS) : BOARD_ROWS) * CELL_STEP / 2 - point.y;
          var column = Math.floor(colX / CELL_STEP);
          var row = Math.floor(rowY / CELL_STEP);

          if (column < 0 || column >= (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
            error: Error()
          }), BOARD_COLUMNS) : BOARD_COLUMNS) || row < 0 || row >= (_crd && BOARD_ROWS === void 0 ? (_reportPossibleCrUseOfBOARD_ROWS({
            error: Error()
          }), BOARD_ROWS) : BOARD_ROWS)) {
            return -1;
          }

          var margin = (CELL_STEP - CELL_SIZE) / 2;
          var x = colX - column * CELL_STEP;
          var y = rowY - row * CELL_STEP;
          return Math.min(x, y, CELL_STEP - x, CELL_STEP - y) >= margin ? row * (_crd && BOARD_COLUMNS === void 0 ? (_reportPossibleCrUseOfBOARD_COLUMNS({
            error: Error()
          }), BOARD_COLUMNS) : BOARD_COLUMNS) + column : -1;
        } // 记录单指棋盘操作的起点，忽略并发触点。


        onBoardStart(event) {
          if (this.gesture) {
            return;
          }

          var point = this.getBoardPoint(event);
          var from = this.getCell(point);
          var touchId = event.getID();

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
          var gesture = this.gesture;

          if (!gesture || gesture.touchId !== event.getID()) {
            return;
          }

          var item = this.state.board[gesture.from];

          if (!item) {
            return;
          }

          var point = this.getBoardPoint(event);
          var firstDrag = !gesture.dragging;

          if (firstDrag && Math.hypot(point.x - gesture.x, point.y - gesture.y) < 10) {
            return;
          }

          if (firstDrag) {
            gesture.dragging = true;
            this.selected = -1;
            this.ghost.node.active = true;
            (_crd && paintAlloyItem === void 0 ? (_reportPossibleCrUseOfpaintAlloyItem({
              error: Error()
            }), paintAlloyItem) : paintAlloyItem)(this.ghostIcon, item);
          }

          this.ghost.node.setPosition(point.x, point.y, 0);
          var hover = this.getCell(point);

          if (firstDrag || hover !== gesture.hover) {
            gesture.hover = hover;
            this.paintBoard();
          }
        } // 释放时提交拖拽，或用两次点击完成选择和落格。


        onBoardEnd(event) {
          var gesture = this.gesture;

          if (!gesture || gesture.touchId !== event.getID()) {
            return;
          }

          var target = this.getCell(this.getBoardPoint(event));
          this.clearGesture();

          if (gesture.dragging) {
            if (target !== -1 && target !== gesture.from) {
              this.drop(gesture.from, target);
            }
          } else if (target === gesture.from) {
            var item = this.state.board[target];

            if (this.selected !== -1 && target !== this.selected && (!item || this.state.canMerge(this.selected, target))) {
              this.drop(this.selected, target);
            } else if (item) {
              this.unlockAudio();
              this.selected = this.selected === target ? -1 : target;
              this.status = this.selected === -1 ? '已取消选择' : "\u5DF2\u9009\u4E2D " + (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
                error: Error()
              }), getAlloyItemName) : getAlloyItemName)(item);
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
          this.gesture = null;

          if (this.ghost) {
            this.ghost.node.active = false;
          }
        } // 提交落格并按移动或合成结果提示玩家。


        drop(from, to) {
          var result = this.state.drop(from, to);

          if (result === 'blocked') {
            this.status = '只能放入空格，或合成同类同阶物品。';
            return;
          }

          this.unlockAudio();
          this.selected = -1;
          var item = this.state.board[to];
          this.status = result === 'merge' ? "\u5408\u6210\u6210\u529F \xB7 " + (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
            error: Error()
          }), getAlloyItemName) : getAlloyItemName)(item) : '物品已移动';

          if (result === 'merge') {
            this.playEffect(this.mergeClip);
            this.track({
              type: 'item_merged',
              item: _extends({}, item)
            });
          }
        } // 尝试采集矿物并反馈体力不足或棋盘已满的情况。


        generate() {
          if (this.gesture) {
            return;
          }

          var result = this.state.generate(Date.now());

          if (typeof result === 'number') {
            this.unlockAudio();
            this.selected = -1;
            var item = this.state.board[result];
            this.status = "\u91C7\u96C6\u6210\u529F \xB7 " + (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
              error: Error()
            }), getAlloyItemName) : getAlloyItemName)(item);
            this.playEffect(this.generateClip);
            this.track({
              type: 'item_generated',
              item: _extends({}, item),
              energy: this.state.energy
            });
          } else {
            this.status = result === 'full' ? '棋盘已满，先合成、交付或回收物品。' : '体力不足，请等待恢复。';
          }

          this.refresh();
        } // 交付满足要求的物品并推进订单和新手引导。


        deliver() {
          if (this.gesture) {
            return;
          }

          var tutorialWasActive = this.state.tutorial !== 'complete';
          var completed = this.state.deliver(Date.now());

          if (completed) {
            this.unlockAudio();
            this.selected = -1;
            this.status = tutorialWasActive ? '新手引导完成 · 下一张订单已到达' : "\u5DF2\u4EA4\u4ED8 \xB7 +" + completed.reward + " \u4F53\u529B";
            this.playEffect(this.orderClip);
            this.track({
              type: 'order_delivered',
              orderCount: this.state.orderCount,
              item: _extends({}, completed.item)
            });

            if (tutorialWasActive) {
              this.track({
                type: 'tutorial_completed'
              });
            }
          } else {
            this.status = "\u8FD8\u9700\u8981 " + (_crd && getAlloyItemName === void 0 ? (_reportPossibleCrUseOfgetAlloyItemName({
              error: Error()
            }), getAlloyItemName) : getAlloyItemName)(this.state.order.item);
          }

          this.refresh();
        } // 清除一个选中的多余物品并更新棋盘。


        recycle() {
          if (this.gesture) {
            return;
          }

          if (this.state.recycle(this.selected)) {
            this.unlockAudio();
            this.selected = -1;
            this.status = '物品已回收';
          } else {
            this.status = this.state.tutorial === 'complete' ? '先点选要回收的物品。' : '完成新手引导后可回收。';
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

          this.paintControl(this.muteControl, this.muted ? '声音关' : '声音开', null);
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
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "generateClip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mergeClip", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "orderClip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sdkAdapter", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=22d5b51bbb34c60bc305a849d6aef51e3d1263fb.js.map