System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Graphics, Label, Node, UITransform, _crd, ALLOY_COLORS;

  // 创建继承父节点渲染层的界面节点，并设定尺寸与位置。
  function createAlloyNode(parent, name, x, y, w, h) {
    var node = new Node(name);
    node.layer = parent.layer;
    parent.addChild(node);
    node.setPosition(x, y, 0);
    node.addComponent(UITransform).setContentSize(w, h);
    return node;
  } // 创建可重绘的圆角底板。


  function createAlloyPlate(parent, name, x, y, width, height, fill, border, radius) {
    if (radius === void 0) {
      radius = 16;
    }

    var node = createAlloyNode(parent, name, x, y, width, height);
    var graphics = node.addComponent(Graphics);
    paintAlloyPlate(graphics, width, height, fill, border, radius);
    return {
      node,
      graphics
    };
  } // 使用当前背景和边框颜色重绘底板。


  function paintAlloyPlate(graphics, width, height, fill, border, radius) {
    graphics.clear();
    graphics.fillColor = Color.fromHEX(new Color(), fill);
    graphics.roundRect(-width / 2, -height / 2, width, height, radius);
    graphics.fill();
    graphics.strokeColor = Color.fromHEX(new Color(), border);
    graphics.lineWidth = 1.6;
    graphics.roundRect(-width / 2 + 1, -height / 2 + 1, width - 2, height - 2, radius);
    graphics.stroke();
  } // 创建带对齐和换行规则的界面标签。


  function createAlloyLabel(parent, name, text, x, y, width, height, size, color, align, bold) {
    if (align === void 0) {
      align = Label.HorizontalAlign.LEFT;
    }

    if (bold === void 0) {
      bold = false;
    }

    var node = createAlloyNode(parent, name, x, y, width, height);
    var label = node.addComponent(Label);
    label.fontSize = size;
    label.lineHeight = size + 5;
    label.color = Color.fromHEX(new Color(), color);
    label.horizontalAlign = align;
    label.verticalAlign = Label.VerticalAlign.CENTER;
    label.overflow = Label.Overflow.SHRINK;
    label.enableWrapText = false;
    label.isBold = bold;
    label.string = text;
    return label;
  } // 绘制用于矿石与晶核切面的实心多边形。


  function fillFacet(graphics, color, points) {
    graphics.fillColor = Color.fromHEX(new Color(), color);
    graphics.moveTo(points[0], points[1]);

    for (var index = 2; index < points.length; index += 2) {
      graphics.lineTo(points[index], points[index + 1]);
    }

    graphics.close();
    graphics.fill();
  } // 按矿物系列和阶段绘制剪影、切面与高光。


  function paintAlloyItem(graphics, item) {
    graphics.clear();

    if (!item) {
      return;
    }

    var copper = item.family === 'copper';
    var edge = copper ? '#512F35' : '#234459';
    var shadow = copper ? '#9B503F' : '#397795';
    var base = copper ? '#E38456' : '#65BFCB';
    var light = copper ? '#FFC278' : '#A6F0E6';
    var shine = copper ? '#FFE5B7' : '#E9FFF6';
    graphics.fillColor = Color.fromHEX(new Color(), '#0D1520');
    graphics.ellipse(0, -21, 22, 5);
    graphics.fill();

    if (item.tier === 1) {
      fillFacet(graphics, edge, [-25, -7, -14, 15, 4, 24, 23, 10, 25, -8, 9, -23, -9, -20]);
      fillFacet(graphics, base, [-22, -6, -12, 13, 4, 21, 20, 9, 22, -7, 8, -20, -8, -17]);
      fillFacet(graphics, light, [-12, 13, 4, 21, 20, 9, 5, 5, -8, 2]);
      fillFacet(graphics, shadow, [5, 5, 20, 9, 22, -7, 8, -20, -8, -17]);
      fillFacet(graphics, shine, [-10, 13, 4, 21, 8, 17, -6, 10]);
    } else if (item.tier === 2) {
      fillFacet(graphics, edge, [-27, -10, -15, 16, 11, 22, 26, 8, 24, -10, -3, -23]);
      fillFacet(graphics, base, [-24, -9, -13, 14, 11, 19, 23, 7, 21, -8, -3, -20]);
      fillFacet(graphics, light, [-13, 14, 11, 19, 23, 7, -3, -2, -24, -9]);
      fillFacet(graphics, shadow, [-24, -9, -3, -2, 23, 7, 21, -8, -3, -20]);
      fillFacet(graphics, shine, [-13, 14, 11, 19, 15, 15, -11, 10, -19, -2]);
    } else {
      fillFacet(graphics, edge, [-26, -10, -26, 11, -11, 24, 11, 24, 26, 11, 26, -10, 11, -24, -11, -24]);
      fillFacet(graphics, shadow, [-23, -8, -23, 9, -9, 21, 9, 21, 23, 9, 23, -8, 9, -21, -9, -21]);
      fillFacet(graphics, light, [-16, 0, 0, 20, 15, 1, 0, -20]);
      fillFacet(graphics, base, [0, 20, 15, 1, 0, -20, 1, -1]);
      fillFacet(graphics, shine, [-16, 0, 0, 20, 1, -1, -2, -12]);
    }
  }

  function _reportPossibleCrUseOfAlloyItem(extras) {
    _reporterNs.report("AlloyItem", "./AlloyGameState", _context.meta, extras);
  }

  _export({
    createAlloyNode: createAlloyNode,
    createAlloyPlate: createAlloyPlate,
    paintAlloyPlate: paintAlloyPlate,
    createAlloyLabel: createAlloyLabel,
    paintAlloyItem: paintAlloyItem
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c96aqNVNdLQoU5PB/V4tg4", "AlloyArt", undefined);

      __checkObsolete__(['Color', 'Graphics', 'Label', 'Node', 'UITransform']);

      __checkObsolete__(['HorizontalTextAlignment']);

      _export("ALLOY_COLORS", ALLOY_COLORS = {
        background: '#101722',
        panel: '#182434',
        inset: '#131E2C',
        border: '#33465B',
        text: '#F4F2E8',
        secondary: '#B3C4D6',
        muted: '#879BB3',
        aqua: '#83E5D1',
        orange: '#F8BA81',
        darkText: '#122127'
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=55caa02fa844cac17b9b7dc00698b96b71b7c8fd.js.map