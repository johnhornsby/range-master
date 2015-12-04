"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = (function () {
	function Rectangle(left, top, width, height) {
		_classCallCheck(this, Rectangle);

		this.left = left || 0;
		this.top = top || 0;
		this.width = width || 0;
		this.height = height || 0;
	}

	_createClass(Rectangle, [{
		key: "contains",
		value: function contains(x, y) {
			if (x >= this.left && x < this.left + this.width && y >= this.top && y < this.top + this.height) {
				return true;
			}
			return false;
		}
	}, {
		key: "containsRect",
		value: function containsRect(x, y, w, h) {
			if (x >= this.left && x + w <= this.left + this.width && y >= this.top && y + h <= this.top + this.height) {
				return true;
			}
			return false;
		}
	}, {
		key: "union",
		value: function union(toUnion) {
			var union = new Rectangle();
			union.left = Math.min(this.left, toUnion.left);
			union.top = Math.min(this.top, toUnion.top);
			union.width = Math.max(this.left + this.width, toUnion.left + toUnion.width) - union.left;
			union.height = Math.max(this.top + this.height, toUnion.top + toUnion.height) - union.top;
			return union;
		}
	}, {
		key: "toString",
		value: function toString() {
			return "Rectangle left:" + this.left + " top:" + this.top + " width:" + this.width + " height:" + this.height;
		}
	}]);

	return Rectangle;
})();

exports["default"] = Rectangle;
module.exports = exports["default"];