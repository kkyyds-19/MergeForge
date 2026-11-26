System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, AlloyGameState, _crd, BOARD_COLUMNS, BOARD_ROWS, ENERGY_CAPACITY, ENERGY_INTERVAL_MS, MAX_ITEM_TIER, ALLOY_ITEMS, ORDERS, GENERATOR_PATTERN, FIRST_ITEM_CELL;

  // 根据物品的系列和阶段返回界面使用的名称。
  function getAlloyItemName(item) {
    return ALLOY_ITEMS[item.family][item.tier - 1];
  }

  _export({
    AlloyGameState: void 0,
    getAlloyItemName: getAlloyItemName
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7fecadI+KhK3a3Rj8KRNL3+", "AlloyGameState", undefined);

      _export("BOARD_COLUMNS", BOARD_COLUMNS = 5);

      _export("BOARD_ROWS", BOARD_ROWS = 5);

      _export("ENERGY_CAPACITY", ENERGY_CAPACITY = 12);

      _export("ENERGY_INTERVAL_MS", ENERGY_INTERVAL_MS = 5000);

      _export("MAX_ITEM_TIER", MAX_ITEM_TIER = 3);

      _export("ALLOY_ITEMS", ALLOY_ITEMS = {
        copper: ['铜矿', '铜锭', '跃迁核心'],
        quartz: ['石英碎片', '石英棱柱', '谐振核心']
      });

      ORDERS = [{
        customer: '轨道维修站',
        item: {
          family: 'copper',
          tier: 2
        },
        reward: 3
      }, {
        customer: '极地观测站',
        item: {
          family: 'quartz',
          tier: 2
        },
        reward: 4
      }, {
        customer: '航标工程队',
        item: {
          family: 'copper',
          tier: 3
        },
        reward: 6
      }, {
        customer: '峡谷通讯站',
        item: {
          family: 'quartz',
          tier: 3
        },
        reward: 6
      }];
      GENERATOR_PATTERN = ['copper', 'copper', 'quartz', 'copper', 'quartz'];
      FIRST_ITEM_CELL = 11;

      _export("AlloyGameState", AlloyGameState = class AlloyGameState {
        // 放入第一块教程矿石并启动体力恢复计时。
        constructor(nowMs) {
          this.cells = Array.from({
            length: BOARD_COLUMNS * BOARD_ROWS
          }, () => null);
          this.generatedCount = 0;
          this.nextEnergyAtMs = null;
          this.currentEnergy = 8;
          this.fulfilledOrders = 0;
          this.currentTutorial = 'generate';
          this.cells[FIRST_ITEM_CELL] = {
            family: 'copper',
            tier: 1
          };
          this.nextEnergyAtMs = nowMs + ENERGY_INTERVAL_MS;
        } // 提供当前棋盘格内容供界面绘制。


        get board() {
          return this.cells;
        } // 返回当前可用体力。


        get energy() {
          return this.currentEnergy;
        } // 返回已经交付的订单数量。


        get orderCount() {
          return this.fulfilledOrders;
        } // 根据交付进度从订单队列取出当前订单。


        get order() {
          return ORDERS[this.fulfilledOrders % ORDERS.length];
        } // 返回下一次采集会生成的矿物类型。


        get nextFamily() {
          return GENERATOR_PATTERN[this.generatedCount % GENERATOR_PATTERN.length];
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
        } // 在首个空格生成矿物，成功后扣除一点体力。


        generate(nowMs) {
          this.recoverEnergy(nowMs);
          const cell = this.cells.indexOf(null);

          if (cell === -1) {
            return 'full';
          }

          if (this.currentEnergy === 0) {
            return 'noEnergy';
          }

          this.cells[cell] = {
            family: this.nextFamily,
            tier: 1
          };
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

          if (!this.isCell(from) || !this.isCell(to) || from === to || !source) {
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

          if (target && this.currentTutorial === 'merge' && this.canDeliver()) {
            this.currentTutorial = 'deliver';
          }

          return target ? 'merge' : 'move';
        } // 判断两个不同格子里的物品能否合成。


        canMerge(from, to) {
          const source = this.cells[from];
          const target = this.cells[to];
          return from !== to && !!source && !!target && source.family === target.family && source.tier === target.tier && source.tier < MAX_ITEM_TIER;
        } // 查找一件符合当前订单要求的物品。


        getOrderCell() {
          const required = this.order.item;
          return this.cells.findIndex(item => (item == null ? void 0 : item.family) === required.family && item.tier === required.tier);
        } // 判断当前棋盘能否交付订单。


        canDeliver() {
          return this.getOrderCell() !== -1;
        } // 消耗所需物品、发放体力奖励并切换到下一张订单。


        deliver(nowMs) {
          const cell = this.getOrderCell();

          if (cell === -1) {
            return null;
          }

          this.recoverEnergy(nowMs);
          const completedOrder = this.order;
          this.cells[cell] = null;
          this.fulfilledOrders += 1;
          this.currentEnergy = Math.min(ENERGY_CAPACITY, this.currentEnergy + completedOrder.reward);

          if (this.currentEnergy === ENERGY_CAPACITY) {
            this.nextEnergyAtMs = null;
          }

          this.currentTutorial = 'complete';
          return completedOrder;
        } // 在教程完成后回收多余物品，给采集腾出空格。


        recycle(cell) {
          if (this.currentTutorial !== 'complete' || !this.isCell(cell) || !this.cells[cell]) {
            return false;
          }

          this.cells[cell] = null;
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