System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, AlloySdkAdapter;

  function _reportPossibleCrUseOfAlloyItem(extras) {
    _reporterNs.report("AlloyItem", "./AlloyGameState", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c4bcbjDzAdLHag4TBg6XrBO", "AlloySdkAdapter", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);

      _export("AlloySdkAdapter", AlloySdkAdapter = (_dec = ccclass('AlloySdkAdapter'), _dec(_class = class AlloySdkAdapter extends Component {
        // 接收玩法事件，供接入广告平台时覆写并转发。
        trackEvent(_event) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dda9df087c17d8582f94b8c0b587bb57d761f8a0.js.map