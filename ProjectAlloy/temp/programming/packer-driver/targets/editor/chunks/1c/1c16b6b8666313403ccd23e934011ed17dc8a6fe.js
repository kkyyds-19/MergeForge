System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, ALLOY_CHAPTERS, ALLOY_FAMILIES, ALLOY_FREE_PLAY_ORDER_COUNT, ALLOY_FREE_PLAY_ORDERS, ALLOY_GENERATOR_LEVELS, ALLOY_ITEMS, ALLOY_SUPPLY_ROUTES, AlloyGameState, _crd, BOARD_COLUMNS, BOARD_ROWS, ENERGY_CAPACITY, ENERGY_INTERVAL_MS, MAX_ITEM_TIER, ORDERS_PER_ROUND, GENERATOR_PATTERN, FIRST_ITEM_CELL;

  // 判断存档里的数字能否安全地作为非负整数计数。
  function isProgressCount(value) {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
  } // 检查单格存档是否为空格，或包含受支持的系列与等级。


  function isSavedCell(value) {
    if (value === null) {
      return true;
    }

    if (typeof value !== 'object' || !value) {
      return false;
    }

    const {
      family,
      tier
    } = value;
    return (family === 'copper' || family === 'quartz' || family === 'berry') && isProgressCount(tier) && tier >= 1 && tier <= (_crd && ALLOY_ITEMS === void 0 ? (_reportPossibleCrUseOfALLOY_ITEMS({
      error: Error()
    }), ALLOY_ITEMS) : ALLOY_ITEMS)[family].length;
  }

  function _reportPossibleCrUseOfALLOY_CHAPTERS(extras) {
    _reporterNs.report("ALLOY_CHAPTERS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_FAMILIES(extras) {
    _reporterNs.report("ALLOY_FAMILIES", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_FREE_PLAY_ORDER_COUNT(extras) {
    _reporterNs.report("ALLOY_FREE_PLAY_ORDER_COUNT", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_FREE_PLAY_ORDERS(extras) {
    _reporterNs.report("ALLOY_FREE_PLAY_ORDERS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_GENERATOR_LEVELS(extras) {
    _reporterNs.report("ALLOY_GENERATOR_LEVELS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_ITEMS(extras) {
    _reporterNs.report("ALLOY_ITEMS", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfALLOY_SUPPLY_ROUTES(extras) {
    _reporterNs.report("ALLOY_SUPPLY_ROUTES", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyFamily(extras) {
    _reporterNs.report("AlloyFamily", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyItem(extras) {
    _reporterNs.report("AlloyItem", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloyOrder(extras) {
    _reporterNs.report("AlloyOrder", "./AlloyCampaign", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAlloySupplyRoute(extras) {
    _reporterNs.report("AlloySupplyRoute", "./AlloyCampaign", _context.meta, extras);
  }

  _export("AlloyGameState", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      ALLOY_CHAPTERS = _unresolved_2.ALLOY_CHAPTERS;
      ALLOY_FAMILIES = _unresolved_2.ALLOY_FAMILIES;
      ALLOY_FREE_PLAY_ORDER_COUNT = _unresolved_2.ALLOY_FREE_PLAY_ORDER_COUNT;
      ALLOY_FREE_PLAY_ORDERS = _unresolved_2.ALLOY_FREE_PLAY_ORDERS;
      ALLOY_GENERATOR_LEVELS = _unresolved_2.ALLOY_GENERATOR_LEVELS;
      ALLOY_ITEMS = _unresolved_2.ALLOY_ITEMS;
      ALLOY_SUPPLY_ROUTES = _unresolved_2.ALLOY_SUPPLY_ROUTES;
    }, function (_unresolved_3) {
      _export({
        ALLOY_ITEMS: _unresolved_3.ALLOY_ITEMS,
        getAlloyItemName: _unresolved_3.getAlloyItemName
      });
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7fecadI+KhK3a3Rj8KRNL3+", "AlloyGameState", undefined);

      _export("BOARD_COLUMNS", BOARD_COLUMNS = 5);

      _export("BOARD_ROWS", BOARD_ROWS = 5);

      _export("ENERGY_CAPACITY", ENERGY_CAPACITY = 12);

      _export("ENERGY_INTERVAL_MS", ENERGY_INTERVAL_MS = 5000);

      _export("MAX_ITEM_TIER", MAX_ITEM_TIER = Math.max(...(_crd && ALLOY_FAMILIES === void 0 ? (_reportPossibleCrUseOfALLOY_FAMILIES({
        error: Error()
      }), ALLOY_FAMILIES) : ALLOY_FAMILIES).map(family => (_crd && ALLOY_ITEMS === void 0 ? (_reportPossibleCrUseOfALLOY_ITEMS({
        error: Error()
      }), ALLOY_ITEMS) : ALLOY_ITEMS)[family].length)));

      _export("ORDERS_PER_ROUND", ORDERS_PER_ROUND = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
        error: Error()
      }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS)[0].orders.length);

      GENERATOR_PATTERN = ['copper', 'copper', 'quartz', 'copper', 'quartz'];
      FIRST_ITEM_CELL = 11;

      _export("AlloyGameState", AlloyGameState = class AlloyGameState {
        // 放入第一个教程道具并启动体力恢复计时。
        constructor(nowMs) {
          this.cells = Array.from({
            length: BOARD_COLUMNS * BOARD_ROWS
          }, () => null);
          this.generatedCount = 0;
          this.nextEnergyAtMs = null;
          this.currentEnergy = 8;
          this.fulfilledOrders = 0;
          this.currentRound = 1;
          this.deliveredThisRound = 0;
          this.currentGeneratorLevel = 1;
          this.stamps = 0;
          this.route = 'mixed';
          this.currentTutorial = 'generate';
          this.cells[FIRST_ITEM_CELL] = {
            family: 'copper',
            tier: 1
          };
          this.nextEnergyAtMs = nowMs + ENERGY_INTERVAL_MS;
        } // 校验并迁移存档，恢复棋盘、营业关卡、补货台和离线体力。


        static restore(value, nowMs) {
          if (typeof value !== 'object' || !value) {
            return null;
          }

          const snapshot = value;
          const {
            cells,
            generatedCount,
            nextEnergyAtMs,
            energy,
            fulfilledOrders,
            tutorial
          } = snapshot;

          if (snapshot.version !== 1 && snapshot.version !== 2 || !Array.isArray(cells) || cells.length !== BOARD_COLUMNS * BOARD_ROWS || !Array.from(cells).every(isSavedCell) || !isProgressCount(generatedCount) || !isProgressCount(energy) || energy > ENERGY_CAPACITY || !isProgressCount(fulfilledOrders) || !(tutorial === 'generate' || tutorial === 'merge' || tutorial === 'deliver' || tutorial === 'complete') || (energy === ENERGY_CAPACITY ? nextEnergyAtMs !== null : !isProgressCount(nextEnergyAtMs)) || tutorial === 'complete' !== fulfilledOrders > 0 || tutorial === 'generate' !== (generatedCount === 0)) {
            return null;
          }

          const state = new AlloyGameState(nowMs);
          cells.forEach((item, index) => {
            state.cells[index] = item ? { ...item
            } : null;
          });
          state.generatedCount = generatedCount;
          state.currentEnergy = energy;
          state.nextEnergyAtMs = nextEnergyAtMs === null ? null : Math.min(nextEnergyAtMs, nowMs + ENERGY_INTERVAL_MS);
          state.fulfilledOrders = fulfilledOrders;
          state.currentTutorial = tutorial;

          if (snapshot.version === 1) {
            const {
              settledRounds
            } = snapshot;

            if (!isProgressCount(settledRounds)) {
              return null;
            }

            const oldRoundOrders = fulfilledOrders - settledRounds * ORDERS_PER_ROUND;

            if (oldRoundOrders < 0 || oldRoundOrders > ORDERS_PER_ROUND) {
              return null;
            }

            state.currentRound = settledRounds > 0 ? 2 : 1;
            state.deliveredThisRound = settledRounds > 0 ? 0 : oldRoundOrders;
            state.stamps = fulfilledOrders;
          } else {
            const {
              roundNumber,
              roundOrderCount,
              generatorLevel,
              upgradeStamps,
              supplyRoute
            } = snapshot;

            if (!isProgressCount(roundNumber) || roundNumber < 1 || !isProgressCount(roundOrderCount) || !isProgressCount(generatorLevel) || generatorLevel < 1 || generatorLevel > (_crd && ALLOY_GENERATOR_LEVELS === void 0 ? (_reportPossibleCrUseOfALLOY_GENERATOR_LEVELS({
              error: Error()
            }), ALLOY_GENERATOR_LEVELS) : ALLOY_GENERATOR_LEVELS).length || (_crd && ALLOY_GENERATOR_LEVELS === void 0 ? (_reportPossibleCrUseOfALLOY_GENERATOR_LEVELS({
              error: Error()
            }), ALLOY_GENERATOR_LEVELS) : ALLOY_GENERATOR_LEVELS)[generatorLevel - 1].chapter > roundNumber || !isProgressCount(upgradeStamps) || upgradeStamps > fulfilledOrders || !supplyRoute || (_crd && ALLOY_SUPPLY_ROUTES === void 0 ? (_reportPossibleCrUseOfALLOY_SUPPLY_ROUTES({
              error: Error()
            }), ALLOY_SUPPLY_ROUTES) : ALLOY_SUPPLY_ROUTES).indexOf(supplyRoute) === -1 || roundNumber === 1 && supplyRoute !== 'mixed') {
              return null;
            }

            state.currentRound = roundNumber;
            state.deliveredThisRound = roundOrderCount;
            state.currentGeneratorLevel = generatorLevel;
            state.stamps = upgradeStamps;
            state.route = supplyRoute;
            const completedStoryOrders = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
              error: Error()
            }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).slice(0, roundNumber - 1).reduce((sum, chapter) => sum + chapter.orders.length, 0);
            const completedFreeRounds = Math.max(0, roundNumber - (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
              error: Error()
            }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length - 1);

            if (roundOrderCount > state.roundOrderTotal || completedStoryOrders + completedFreeRounds * (_crd && ALLOY_FREE_PLAY_ORDER_COUNT === void 0 ? (_reportPossibleCrUseOfALLOY_FREE_PLAY_ORDER_COUNT({
              error: Error()
            }), ALLOY_FREE_PLAY_ORDER_COUNT) : ALLOY_FREE_PLAY_ORDER_COUNT) + roundOrderCount > fulfilledOrders) {
              return null;
            }
          }

          state.recoverEnergy(nowMs);
          return state;
        } // 生成可序列化的独立快照，记录完整的一局进度。


        getSnapshot() {
          return {
            version: 2,
            cells: this.cells.map(item => item ? { ...item
            } : null),
            generatedCount: this.generatedCount,
            nextEnergyAtMs: this.nextEnergyAtMs,
            energy: this.currentEnergy,
            fulfilledOrders: this.fulfilledOrders,
            roundNumber: this.currentRound,
            roundOrderCount: this.deliveredThisRound,
            generatorLevel: this.currentGeneratorLevel,
            upgradeStamps: this.stamps,
            supplyRoute: this.route,
            tutorial: this.currentTutorial
          };
        } // 提供当前棋盘格内容供界面绘制。


        get board() {
          return this.cells;
        } // 返回当前可用体力。


        get energy() {
          return this.currentEnergy;
        } // 返回已经交付的订单数量。


        get orderCount() {
          return this.fulfilledOrders;
        } // 返回当前剧情关卡或自由营业轮次的连续编号。


        get roundNumber() {
          return this.currentRound;
        } // 返回本轮已交付的订单数。


        get roundOrderCount() {
          return this.deliveredThisRound;
        } // 返回本关需要交付的订单数量。


        get roundOrderTotal() {
          var _orders$length, _ref;

          return (_orders$length = (_ref = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS)[this.currentRound - 1]) == null ? void 0 : _ref.orders.length) != null ? _orders$length : _crd && ALLOY_FREE_PLAY_ORDER_COUNT === void 0 ? (_reportPossibleCrUseOfALLOY_FREE_PLAY_ORDER_COUNT({
            error: Error()
          }), ALLOY_FREE_PLAY_ORDER_COUNT) : ALLOY_FREE_PLAY_ORDER_COUNT;
        } // 返回当前剧情关名或自由营业轮次标题。


        get roundTitle() {
          const chapter = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS)[this.currentRound - 1];
          return chapter ? `第 ${this.currentRound} 关 · ${chapter.name}` : `自由营业 ${this.currentRound - (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length}`;
        } // 提供结算页使用的下一关名称。


        get nextRoundName() {
          var _this$currentRound$na, _this$currentRound;

          return (_this$currentRound$na = (_this$currentRound = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS)[this.currentRound]) == null ? void 0 : _this$currentRound.name) != null ? _this$currentRound$na : '自由营业';
        } // 判断剧情最后一关是否已通关。


        get campaignComplete() {
          return this.currentRound > (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length || this.currentRound === (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length && this.roundComplete;
        } // 判断本轮订单是否全部交付，等待玩家选择下一步。


        get roundComplete() {
          return this.deliveredThisRound === this.roundOrderTotal;
        } // 确认结算并开启新一轮，沿用当前棋盘与体力。


        continueRound() {
          if (!this.roundComplete) {
            return false;
          }

          this.currentRound += 1;
          this.deliveredThisRound = 0;
          return true;
        } // 选择当前关的订单，通关后按自由营业轮次轮换菜单。


        get order() {
          const index = Math.min(this.deliveredThisRound, this.roundOrderTotal - 1);
          const chapter = (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS)[this.currentRound - 1];

          if (chapter) {
            return chapter.orders[index];
          }

          const offset = (this.currentRound - (_crd && ALLOY_CHAPTERS === void 0 ? (_reportPossibleCrUseOfALLOY_CHAPTERS({
            error: Error()
          }), ALLOY_CHAPTERS) : ALLOY_CHAPTERS).length - 1) % (_crd && ALLOY_FREE_PLAY_ORDERS === void 0 ? (_reportPossibleCrUseOfALLOY_FREE_PLAY_ORDERS({
            error: Error()
          }), ALLOY_FREE_PLAY_ORDERS) : ALLOY_FREE_PLAY_ORDERS).length;
          return (_crd && ALLOY_FREE_PLAY_ORDERS === void 0 ? (_reportPossibleCrUseOfALLOY_FREE_PLAY_ORDERS({
            error: Error()
          }), ALLOY_FREE_PLAY_ORDERS) : ALLOY_FREE_PLAY_ORDERS)[(offset + index) % (_crd && ALLOY_FREE_PLAY_ORDERS === void 0 ? (_reportPossibleCrUseOfALLOY_FREE_PLAY_ORDERS({
            error: Error()
          }), ALLOY_FREE_PLAY_ORDERS) : ALLOY_FREE_PLAY_ORDERS).length];
        } // 选择定向补货的系列，或沿用开局的混合生产顺序。


        get nextFamily() {
          if (this.route !== 'mixed') {
            return this.route;
          }

          const pattern = this.canSelectSupplyRoute ? _crd && ALLOY_FAMILIES === void 0 ? (_reportPossibleCrUseOfALLOY_FAMILIES({
            error: Error()
          }), ALLOY_FAMILIES) : ALLOY_FAMILIES : GENERATOR_PATTERN;
          return pattern[this.generatedCount % pattern.length];
        } // 预览下一件补货成品，按补货台等级提高产出的起始阶数。


        get nextItem() {
          const {
            tier,
            bonusEvery
          } = (_crd && ALLOY_GENERATOR_LEVELS === void 0 ? (_reportPossibleCrUseOfALLOY_GENERATOR_LEVELS({
            error: Error()
          }), ALLOY_GENERATOR_LEVELS) : ALLOY_GENERATOR_LEVELS)[this.currentGeneratorLevel - 1];
          const bonus = bonusEvery > 0 && (this.generatedCount + 1) % bonusEvery === 0;
          return {
            family: this.nextFamily,
            tier: bonus ? tier + 1 : tier
          };
        } // 返回当前补货台等级。


        get generatorLevel() {
          return this.currentGeneratorLevel;
        } // 返回交付订单后可用于升级的印章数。


        get upgradeStamps() {
          return this.stamps;
        } // 返回下一次升级所需印章，满级时返回空值。


        get nextUpgradeCost() {
          var _this$currentGenerato, _this$currentGenerato2;

          return (_this$currentGenerato = (_this$currentGenerato2 = (_crd && ALLOY_GENERATOR_LEVELS === void 0 ? (_reportPossibleCrUseOfALLOY_GENERATOR_LEVELS({
            error: Error()
          }), ALLOY_GENERATOR_LEVELS) : ALLOY_GENERATOR_LEVELS)[this.currentGeneratorLevel]) == null ? void 0 : _this$currentGenerato2.cost) != null ? _this$currentGenerato : null;
        } // 返回下一次升级开放的关卡编号。


        get nextUpgradeChapter() {
          var _this$currentGenerato3, _this$currentGenerato4;

          return (_this$currentGenerato3 = (_this$currentGenerato4 = (_crd && ALLOY_GENERATOR_LEVELS === void 0 ? (_reportPossibleCrUseOfALLOY_GENERATOR_LEVELS({
            error: Error()
          }), ALLOY_GENERATOR_LEVELS) : ALLOY_GENERATOR_LEVELS)[this.currentGeneratorLevel]) == null ? void 0 : _this$currentGenerato4.chapter) != null ? _this$currentGenerato3 : null;
        } // 判断当前关卡是否开放下一次补货台升级。


        get generatorUpgradeUnlocked() {
          const chapter = this.nextUpgradeChapter;
          return chapter !== null && chapter <= this.currentRound;
        } // 在营业中消耗印章升级补货台，返回升级后的等级。


        upgradeGenerator() {
          const cost = this.nextUpgradeCost;

          if (this.roundComplete || cost === null || !this.generatorUpgradeUnlocked || this.stamps < cost) {
            return null;
          }

          this.stamps -= cost;
          this.currentGeneratorLevel += 1;
          return this.currentGeneratorLevel;
        } // 在试营业结束后开放面点、咖啡和莓果定向补货。


        get canSelectSupplyRoute() {
          return this.currentRound > 1;
        } // 返回补货台当前使用的线路。


        get supplyRoute() {
          return this.route;
        } // 切换下一条补货线路并返回切换结果。


        cycleSupplyRoute() {
          if (!this.canSelectSupplyRoute || this.roundComplete) {
            return null;
          }

          const next = ((_crd && ALLOY_SUPPLY_ROUTES === void 0 ? (_reportPossibleCrUseOfALLOY_SUPPLY_ROUTES({
            error: Error()
          }), ALLOY_SUPPLY_ROUTES) : ALLOY_SUPPLY_ROUTES).indexOf(this.route) + 1) % (_crd && ALLOY_SUPPLY_ROUTES === void 0 ? (_reportPossibleCrUseOfALLOY_SUPPLY_ROUTES({
            error: Error()
          }), ALLOY_SUPPLY_ROUTES) : ALLOY_SUPPLY_ROUTES).length;
          this.route = (_crd && ALLOY_SUPPLY_ROUTES === void 0 ? (_reportPossibleCrUseOfALLOY_SUPPLY_ROUTES({
            error: Error()
          }), ALLOY_SUPPLY_ROUTES) : ALLOY_SUPPLY_ROUTES)[next];
          return this.route;
        } // 返回当前新手引导步骤。


        get tutorial() {
          return this.currentTutorial;
        } // 按经过的时间恢复体力，满体力时停止计时。


        recoverEnergy(nowMs) {
          if (this.nextEnergyAtMs === null || nowMs < this.nextEnergyAtMs) {
            return;
          }

          const recovered = 1 + Math.floor((nowMs - this.nextEnergyAtMs) / ENERGY_INTERVAL_MS);
          this.currentEnergy = Math.min(ENERGY_CAPACITY, this.currentEnergy + recovered);
          this.nextEnergyAtMs = this.currentEnergy === ENERGY_CAPACITY ? null : this.nextEnergyAtMs + recovered * ENERGY_INTERVAL_MS;
        } // 计算距下一点体力恢复还剩几秒。


        secondsUntilEnergy(nowMs) {
          return this.nextEnergyAtMs === null ? 0 : Math.max(0, Math.ceil((this.nextEnergyAtMs - nowMs) / 1000));
        } // 在首个空格生成道具，成功后扣除一点体力。


        generate(nowMs) {
          if (this.roundComplete) {
            return 'roundComplete';
          }

          this.recoverEnergy(nowMs);
          const cell = this.cells.indexOf(null);

          if (cell === -1) {
            return 'full';
          }

          if (this.currentEnergy === 0) {
            return 'noEnergy';
          }

          this.cells[cell] = this.nextItem;
          this.generatedCount += 1;
          this.currentEnergy -= 1;

          if (this.nextEnergyAtMs === null) {
            this.nextEnergyAtMs = nowMs + ENERGY_INTERVAL_MS;
          }

          if (this.currentTutorial === 'generate') {
            this.currentTutorial = 'merge';
          }

          return cell;
        } // 将物品移入空格或把两件同类同阶物品合成为高一阶物品。


        drop(from, to) {
          const source = this.cells[from];

          if (this.roundComplete || !this.isCell(from) || !this.isCell(to) || from === to || !source) {
            return 'blocked';
          }

          const target = this.cells[to];

          if (target && !this.canMerge(from, to)) {
            return 'blocked';
          }

          this.cells[from] = null;
          this.cells[to] = target ? {
            family: source.family,
            tier: source.tier + 1
          } : source;

          if (this.currentTutorial === 'merge' || this.currentTutorial === 'deliver') {
            this.currentTutorial = this.canDeliver() ? 'deliver' : 'merge';
          }

          return target ? 'merge' : 'move';
        } // 按物品系列的最高阶判断两个不同格子是否可合成。


        canMerge(from, to) {
          const source = this.cells[from];
          const target = this.cells[to];
          return !this.roundComplete && from !== to && !!source && !!target && source.family === target.family && source.tier === target.tier && source.tier < (_crd && ALLOY_ITEMS === void 0 ? (_reportPossibleCrUseOfALLOY_ITEMS({
            error: Error()
          }), ALLOY_ITEMS) : ALLOY_ITEMS)[source.family].length;
        } // 查找一件符合当前订单要求的物品。


        getOrderCell() {
          const required = this.order.item;
          return this.cells.findIndex(item => (item == null ? void 0 : item.family) === required.family && item.tier === required.tier);
        } // 检查双品订单的第二件货，确保双份同款占用不同的格子。


        getExtraOrderCell(first) {
          const required = this.order.extraItem;
          return required ? this.cells.findIndex((item, index) => index !== first && (item == null ? void 0 : item.family) === required.family && item.tier === required.tier) : -1;
        } // 判断当前棋盘能否一次性交齐订单所需的物品。


        canDeliver() {
          const cell = this.getOrderCell();
          return !this.roundComplete && cell !== -1 && (!this.order.extraItem || this.getExtraOrderCell(cell) !== -1);
        } // 一次性交付齐全的物品，发放体力和印章，再推进关卡内订单。


        deliver(nowMs) {
          const cell = this.getOrderCell();
          const completedOrder = this.order;
          const extraCell = this.getExtraOrderCell(cell);

          if (this.roundComplete || cell === -1 || completedOrder.extraItem && extraCell === -1) {
            return null;
          }

          this.recoverEnergy(nowMs);
          this.cells[cell] = null;

          if (extraCell !== -1) {
            this.cells[extraCell] = null;
          }

          this.fulfilledOrders += 1;
          this.deliveredThisRound += 1;
          this.stamps += 1;
          this.currentEnergy = Math.min(ENERGY_CAPACITY, this.currentEnergy + completedOrder.reward);

          if (this.currentEnergy === ENERGY_CAPACITY) {
            this.nextEnergyAtMs = null;
          }

          this.currentTutorial = 'complete';
          return completedOrder;
        } // 判断当前格子是否允许回收，棋盘堵满时也可腾格继续教程。


        canRecycle(cell) {
          return !this.roundComplete && this.isCell(cell) && !!this.cells[cell] && (this.currentTutorial === 'complete' || this.cells.indexOf(null) === -1);
        } // 回收允许移除的物品，并同步首单的教程指引。


        recycle(cell) {
          if (!this.canRecycle(cell)) {
            return false;
          }

          this.cells[cell] = null;

          if (this.currentTutorial === 'deliver' && !this.canDeliver()) {
            this.currentTutorial = 'merge';
          }

          return true;
        } // 确认索引是棋盘上的有效整数格。


        isCell(index) {
          return Number.isInteger(index) && index >= 0 && index < this.cells.length;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1c16b6b8666313403ccd23e934011ed17dc8a6fe.js.map