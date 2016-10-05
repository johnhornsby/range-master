"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _wolfy87Eventemitter = require("wolfy87-eventemitter");

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

var _rangeDog = require("range-dog");

var _rangeDog2 = _interopRequireDefault(_rangeDog);

var _InputController = require("./InputController");

var _InputController2 = _interopRequireDefault(_InputController);

var _motionTween = require("motion-tween");

var _motionTween2 = _interopRequireDefault(_motionTween);

var _DEFAULT_OPTIONS = {
	length: 1,
	frameLength: 1,
	cellLength: 1,
	wrap: false,
	inertia: true,
	rounded: false,
	snap: true,
	target: null,
	contain: false,
	animatorType: _motionTween2["default"].animatorType.friction,
	animatorOptions: null,
	mouseDeltaToRangeUnitRatio: function mouseDeltaToRangeUnitRatio() {
		return 1;
	},
	inputOptions: {
		inputTypes: [_InputController2["default"].INPUT_TYPE.MOUSE, _InputController2["default"].INPUT_TYPE.TOUCH, _InputController2["default"].INPUT_TYPE.WHEEL]
	}
};

var RangeMaster = (function (_EventEmitter) {
	_inherits(RangeMaster, _EventEmitter);

	_createClass(RangeMaster, null, [{
		key: "tweenType",
		value: {
			"INERTIA": 0,
			"SLIDE_TO": 1,
			"SNAP_TO": 2,
			"INERTIA_BOUNCE": 3
		},
		enumerable: true
	}, {
		key: "EVENT_UPDATE",
		value: 'eventUpdate',
		enumerable: true
	}, {
		key: "EVENT_CLICK",
		value: 'eventClick',
		enumerable: true
	}, {
		key: "EVENT_DRAG_COMPLETE",
		value: 'eventDragComplete',
		enumerable: true
	}, {
		key: "EVENT_DRAG_MOVE",
		value: 'eventDragMove',
		enumerable: true
	}, {
		key: "EVENT_DOUBLE_CLICK",
		value: 'eventDoubleClick',
		enumerable: true
	}, {
		key: "EVENT_SLIDE_COMPLETE",
		value: 'eventSlideComplete',
		enumerable: true
	}, {
		key: "EVENT_POINTER_DOWN",
		value: 'eventPointerDown',
		enumerable: true
	}, {
		key: "INERTIA_TIMEOUT",
		value: 100,
		enumerable: true
	}, {
		key: "OUT_OF_RANGE_DRAG_MODIFIER",
		value: 0.25,
		enumerable: true
	}]);

	function RangeMaster(options) {
		_classCallCheck(this, RangeMaster);

		_get(Object.getPrototypeOf(RangeMaster.prototype), "constructor", this).call(this);

		this._options = {};
		this._rangedog = null;
		this._inputController = null;
		this._deltas = [];
		this._cellIndex = 0;
		this._friction = 0.075;
		this._motionTween = null;
		this._tweenType = null;
		this._length = 1;
		this._cellLength = 1;
		this._wrap = false;
		this._inertia = true;
		this._rounded = false;
		this._snap = false;
		this._target = null;
		this._mouseDeltaToRangeUnitRatio = null;
		this._init(options);
	}

	/*_______________________________________________
 	Public Methods
 _______________________________________________*/

	_createClass(RangeMaster, [{
		key: "destroy",
		value: function destroy() {
			this._destroy();
		}
	}, {
		key: "slideToNextCell",
		value: function slideToNextCell() {
			if (this._tweenType !== RangeMaster.tweenType.SLIDE_TO) {
				this._updateCellIndex();
			}

			return this._slideToCellIndex(this._getNextCellIndex(1), 1);
		}
	}, {
		key: "slideToPreviousCell",
		value: function slideToPreviousCell() {
			if (this._tweenType !== RangeMaster.tweenType.SLIDE_TO) {
				this._updateCellIndex();
			}

			return this._slideToCellIndex(this._getNextCellIndex(-1), -1);
		}
	}, {
		key: "slideToCellIndex",
		value: function slideToCellIndex(index) {
			this._updateCellIndex();

			return this._slideToCellIndex(index, 0);
		}
	}, {
		key: "activate",
		value: function activate() {
			this._activate();
		}
	}, {
		key: "deactivate",
		value: function deactivate() {
			this._deactivate();
		}
	}, {
		key: "setMouseWheelScrollDelta",

		/*_______________________________________________
  	Input Controller Event Handlers
  _______________________________________________*/

		value: function setMouseWheelScrollDelta(delta, event) {
			//console.log(`setMouseWheelScrollDelta delta:${delta}`);

			// currently stopping mouse interaction when snap is on, as we have no way of determining a scroll stop event
			if (this._snap === false) {
				this._stopAllAnimation();
				this._onDragMove(delta, 0, 0, 0, "mouseWheel");
			}
		}
	}, {
		key: "dragEnd",
		value: function dragEnd(deltaX, deltaY, x, y, event) {
			// console.log(`dragEnd deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

			this._activatePostDragBehaviour();

			// reset deltas array, as we will want to know the start
			this._deltas = [];

			this.emit(RangeMaster.EVENT_DRAG_COMPLETE, x, y, event);
		}
	}, {
		key: "dragMove",
		value: function dragMove(deltaX, deltaY, x, y, event) {
			// console.log(`dragMove deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

			this._onDragMove(deltaX, deltaY, x, y, "pointer");

			this.emit(RangeMaster.EVENT_DRAG_MOVE, deltaX, deltaY, event);
		}
	}, {
		key: "pointerDown",
		value: function pointerDown(deltaX, deltaY, x, y, event) {
			//console.log(`pointerDown deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

			this._stopAllAnimation();

			this.emit(RangeMaster.EVENT_POINTER_DOWN, x, y, event);
		}
	}, {
		key: "singleClick",
		value: function singleClick(x, y) {
			this.emit(RangeMaster.EVENT_CLICK, x, y);
		}
	}, {
		key: "doubleClick",
		value: function doubleClick(x, y) {
			this.emit(RangeMaster.EVENT_DOUBLE_CLICK, x, y);
		}

		/*_______________________________________________
  	RangeDog Event Handlers
  _______________________________________________*/

	}, {
		key: "_onRangeUpdate",
		value: function _onRangeUpdate(x) {
			// console.log(`_onRangeUpdate ${x}`);
			this.emit(RangeMaster.EVENT_UPDATE, x);
		}

		/*_______________________________________________
  	Private Methods
  _______________________________________________*/

	}, {
		key: "_init",
		value: function _init(options) {
			this._options = _extends({}, _DEFAULT_OPTIONS, options);

			this._length = this._options.length;

			this._cellLength = this._options.cellLength;

			this._wrap = this._options.wrap;

			this._inertia = this._options.inertia;

			this._rounded = this._options.rounded;

			this._snap = this._options.snap;

			this._target = this._options.target;

			this._mouseDeltaToRangeUnitRatio = this._options.mouseDeltaToRangeUnitRatio;

			this._bindMethods();

			this._inputController = new _InputController2["default"](this._target, this._options.inputOptions);
			this._inputController.setDelegate(this);
			this._inputController.activate();

			var rangeDogOptions = _extends({}, this._options);

			this._rangedog = new _rangeDog2["default"](rangeDogOptions);
			this._rangedog.on(_rangeDog2["default"].EVENT_UPDATE, this._onRangeUpdate);
		}
	}, {
		key: "_bindMethods",
		value: function _bindMethods() {
			this._onRangeUpdate = this._onRangeUpdate.bind(this);
			this._motionTweenUpdate = this._motionTweenUpdate.bind(this);
			this._motionTweenComplete = this._motionTweenComplete.bind(this);
		}
	}, {
		key: "_onDragMove",
		value: function _onDragMove(deltaX, deltaY, x, y, input) {
			// drag to the right +
			// drag to the left -
			deltaX *= -1;

			// map mouse delta to range delta
			deltaX *= this._mouseDeltaToRangeUnitRatio();

			// apply modifier to draggin outside of range
			if (this._wrap === false && (this._rangedog.x + deltaX < 0 || this._rangedog.x + deltaX > this._length)) {

				// contain mousewheel
				if (input === "mouseWheel") {
					if (this._rangedog.x + deltaX < 0) {
						deltaX = -this._rangedog.x;
					} else if (this._rangedog.x + deltaX > this._length) {
						deltaX = this._length - this._rangedog.x;
					}

					// otherwise add modifier
				} else {
						deltaX *= RangeMaster.OUT_OF_RANGE_DRAG_MODIFIER;
					}
			}

			// Store delta to evaluate velocity and inertia
			var deltaData = { deltaX: deltaX, deltaY: deltaY, x: x, y: y, time: new Date().getTime(), input: input };
			this._deltas.push(deltaData);

			// sets to the nearest cell index
			this._cellIndex = Math.round((this._rangedog.x + deltaX) / this._cellLength);

			// we use increment here, because when getting rangedog x we get the rounded value, we need to append this delta to the real float
			this._rangedog.increment(deltaX);
		}
	}, {
		key: "_updateCellIndex",
		value: function _updateCellIndex() {
			this._cellIndex = Math.round(this._rangedog.x / this._cellLength);
		}
	}, {
		key: "_getNextCellIndex",
		value: function _getNextCellIndex(polarity) {
			var prospectiveIndex = this._cellIndex + polarity;
			if (this._wrap === false) {
				if (prospectiveIndex < 0) {
					prospectiveIndex = 0;
				} else if (prospectiveIndex > this._length / this._cellLength) {
					prospectiveIndex = this._length / this._cellLength;
				}
			}

			return prospectiveIndex;
		}
	}, {
		key: "_activatePostDragBehaviour",
		value: function _activatePostDragBehaviour() {
			var deltaInfo = this._deltas[this._deltas.length - 1];
			var hasInertia = true;
			var velocity = 0;
			var destination = this._rangedog.x;
			var tweenType = RangeMaster.tweenType.INERTIA;

			// determine if there are an previous deltas, if there has been no dragging then there will be none
			if (!this._deltas || this._deltas.length === 0) {
				return;
			}

			velocity = deltaInfo.deltaX;

			// was the last delta recording within limits
			if (new Date().getTime() - deltaInfo.time > RangeMaster.INERTIA_TIMEOUT) {
				hasInertia = false;
				velocity = 0;
			}

			// if the downward distance is greater than the horizonal movement, ensure we have no inertia to cause snap
			if (Math.abs(deltaInfo.y - this._deltas[0].y) > Math.abs(deltaInfo.x - this._deltas[0].x)) {
				hasInertia = false;
				velocity = 0;
				//console.log(' minimise intention ' + deltaInfo.y + ' ' + this._deltas[0].y + ' ' + deltaInfo.x + " "  + this._deltas[0].x);
			}

			// if RangeMaster is set to snap then force snapping to cell lengths
			if (this._snap) {

				var deltasX = this._deltas.map(function (deltaInfo) {
					return deltaInfo.deltaX;
				});
				var inertiaDirection = deltasX.reduce(function (prev, next) {
					return prev + next;
				});

				// find the nearest cell destination in the direction of the inertia
				if (hasInertia === true) {
					destination = this._rangedog.getNearestCellX(this._rangedog.x, inertiaDirection, false);
				} else {
					// if there is no interia then simply snap to nearest,
					// and in order to really find the nearest we need to set wrap to false, to ensure we actually find
					// the nearest in any direction
					destination = this._rangedog.getNearestCellX(this._rangedog.x, 0, false);
				}

				tweenType = RangeMaster.tweenType.SNAP_TO;

				// else use interia to animate in a continued direction, snapping still occurs if out of range
			} else {

					if (hasInertia === true && this._inertia) {

						destination = this._rangedog.x + velocity / this._friction;

						if (this._wrap === false && (destination < 0 || destination > this._length)) {
							tweenType = RangeMaster.tweenType.INERTIA_BOUNCE;
						}
					} else {
						if (this._wrap === false && this._rangedog.x < 0) {
							destination = 0;
						} else if (this._wrap === false && this._rangedog.x > this._length) {
							destination = this._length;
						}

						tweenType = RangeMaster.tweenType.SNAP_TO;
					}
				}

			if (destination !== this._rangedog.x) {
				this._tweenTo(destination, tweenType);
			}
		}
	}, {
		key: "_slideToCellIndex",
		value: function _slideToCellIndex(index) {
			var polarity = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			if (this._wrap === true) {
				this._cellIndex = this._rangedog.modulo(index * this._cellLength) / this._cellLength;
			} else {
				this._cellIndex = index;
			}

			var destination = index * this._cellLength;

			var moduloDestinaton = this._rangedog.modulo(destination);

			// check need to wrap from left to right
			if (polarity < 0 && moduloDestinaton > this._rangedog.x) {
				// recalculate destination
				destination = -(this._length - moduloDestinaton);
			}

			// check need to wrap from right to left
			if (polarity > 0 && moduloDestinaton < this._rangedog.x) {
				// recalculate destination
				destination = this._length + moduloDestinaton;
			}

			//console.log(`_slideToCellIndex: index=${index} this._cellIndex=${this._cellIndex} polarity=${polarity} destination=${destination}`);

			this._tweenTo(destination, RangeMaster.tweenType.SLIDE_TO);

			return this._cellIndex;
		}
	}, {
		key: "_tweenTo",
		value: function _tweenTo(x, type) {
			this._stopAllAnimation();

			//if we are not wrapping then the x needs to be capped, we do allow last index though
			if (this._wrap === false) {
				if (x >= this._length) {
					x = this._length;
				} else if (x < 0) {
					x = 0;
				}
			}

			this._tweenType = type;

			var tweenConfig = {
				startValue: this._rangedog.x,
				endValue: x,
				animatorType: this._options.animatorType,
				animatorOptions: this._options.animatorOptions, // use defaults of selected type
				update: this._motionTweenUpdate,
				complete: this._motionTweenComplete
			};

			// @todo look at a better way to allow user to customise all animation types and options
			switch (type) {
				case RangeMaster.tweenType.INERTIA_BOUNCE:
					tweenConfig.animatorType = _motionTween2["default"].animatorType.spring;
					tweenConfig.animatorOptions = {
						stiffness: 125,
						damping: 15
					};
					break;
			}

			this._motionTween = new _motionTween2["default"](tweenConfig);

			this._motionTween.start();

			//console.log(`_slideTo: originX=${this._rangedog.x}  x=${x}`);
		}
	}, {
		key: "_motionTweenUpdate",
		value: function _motionTweenUpdate(x) {
			this._rangedog.x = x;
		}
	}, {
		key: "_motionTweenComplete",
		value: function _motionTweenComplete() {
			this._cellIndex = Math.round(this._rangedog.x / this._cellLength);

			this._stopAllAnimation();

			this.emit(RangeMaster.EVENT_SLIDE_COMPLETE);
		}
	}, {
		key: "_stopAllAnimation",
		value: function _stopAllAnimation() {
			if (this._motionTween != null) {
				this._motionTween.destroy();
				this._motionTween = null;
			}

			this._tweenType = null;
		}
	}, {
		key: "_activate",
		value: function _activate() {
			this._inputController.activate();
		}
	}, {
		key: "_deactivate",
		value: function _deactivate() {
			this._inputController.deactivate();
		}
	}, {
		key: "_destroy",
		value: function _destroy() {
			this._rangedog.off(_rangeDog2["default"].EVENT_UPDATE, this._onRangeUpdate);
			this._rangedog = null;
			this._onRangeUpdate = null;

			this._stopAllAnimation();
			this.removeAllListeners();
		}
	}, {
		key: "cellIndex",
		get: function get() {
			return this._cellIndex;
		}
	}, {
		key: "x",
		get: function get() {
			return this._rangedog.x;
		}
	}]);

	return RangeMaster;
})(_wolfy87Eventemitter2["default"]);

exports["default"] = RangeMaster;
module.exports = exports["default"];