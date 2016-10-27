(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

	var _wolfy87Eventemitter = __webpack_require__(1);

	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

	var _rangeDog = __webpack_require__(2);

	var _rangeDog2 = _interopRequireDefault(_rangeDog);

	var _InputController = __webpack_require__(3);

	var _InputController2 = _interopRequireDefault(_InputController);

	var _motionTween = __webpack_require__(5);

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
			key: "_unbindMethods",
			value: function _unbindMethods() {
				this._onRangeUpdate = null;
				this._motionTweenUpdate = null;
				this._motionTweenComplete = null;
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

				this._inputController.destroy();
				this._inputController = null;

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v4.2.11 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */

	;(function () {
	    'use strict';

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var exports = this;
	    var originalGlobalValue = exports.EventEmitter;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;

	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }

	        return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;

	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }

	        return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;

	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }

	        return response || listeners;
	    };

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);

	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;

	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }

	        return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;

	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }

	        return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;

	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);
	                i = listeners.length;

	                while (i--) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];

	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }

	                    response = listener.listener.apply(this, args || []);

	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };

	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };

	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === 'object' && module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}.call(this));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _wolfy87Eventemitter = __webpack_require__(1);

	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

	var RangeDog = (function (_EventEmitter) {
		_inherits(RangeDog, _EventEmitter);

		_createClass(RangeDog, null, [{
			key: "_DEFAULT_OPTIONS",
			value: {
				length: 1,
				frameLength: 1,
				cellLength: 1,
				wrap: false,
				rounded: false,
				contain: false
			},
			enumerable: true
		}, {
			key: "EVENT_UPDATE",
			value: "eventUpdate",
			enumerable: true
		}]);

		function RangeDog(options) {
			_classCallCheck(this, RangeDog);

			_get(Object.getPrototypeOf(RangeDog.prototype), "constructor", this).call(this);

			this._options = {};
			this._length = null;
			this._wrap = null;
			this._rounded = null;
			this._contain = null;
			this._x = 0;
			this._roundedX = 0;
			this._init(options);
		}

		/*_______________________________________________
	 	Public Methods
	 _______________________________________________*/

		_createClass(RangeDog, [{
			key: "getX",
			value: function getX(rounded) {
				return this._getX(rounded);
			}
		}, {
			key: "increment",
			value: function increment(deltaX) {
				this._increment(deltaX);
			}
		}, {
			key: "setTo",
			value: function setTo(x) {
				this._setTo(x);
			}
		}, {
			key: "getNearestCellX",
			value: function getNearestCellX(xFrom, direction, shouldWrap) {
				if (direction === undefined) direction = 0;
				return this._getNearestCellX(xFrom, direction, shouldWrap);
			}
		}, {
			key: "getDirection",
			value: function getDirection(xFrom, xTo) {
				return this._getDirection(xFrom, xTo);
			}
		}, {
			key: "getDistanceX",
			value: function getDistanceX(xFrom, xTo) {
				var direction = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
				var getNearest = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
				return this._getDistanceX(xFrom, xTo, direction, getNearest);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this._destroy();
			}
		}, {
			key: "modulo",
			value: function modulo(x) {
				return this._modulo(x, this._length);
			}

			/*_______________________________________________
	  	Private Methods
	  _______________________________________________*/

		}, {
			key: "_init",
			value: function _init(options) {
				this._options = _extends({}, RangeDog._DEFAULT_OPTIONS, options);
				this._length = this._options.length;
				this._wrap = this._options.wrap;
				this._rounded = this._options.rounded;
				this._contain = this._options.contain;
			}

			/*
	   * Gets the nearest cell to te current position of xFrom
	   *
	   * @private
	  */
		}, {
			key: "_getNearestCellX",
			value: function _getNearestCellX(xFrom, direction, shouldWrap) {
				if (direction === undefined) direction = 0;

				var x = undefined;
				// if direction is specified then we look only in that direction for the nearest cell
				if (direction > 0) {
					// nearest cell to the right
					x = Math.ceil(xFrom / this._options.cellLength) * this._options.cellLength;
				} else if (direction < 0) {
					// nearest cell to the left
					x = Math.floor(xFrom / this._options.cellLength) * this._options.cellLength;
				} else {
					// nearest cell in any direction
					x = Math.round(xFrom / this._options.cellLength) * this._options.cellLength;
				}
				// if we are wrapping then ensure result is contained within range
				if (this._wrap === true && shouldWrap == null || shouldWrap == true) {
					x = this._modulo(x, this._length);
				} else {
					// we need to check here even though no wrap and the ability to calculate outside of the range
					// we can not allow non existant cell positions to be generated, ie -100 or 100 + beyound range length
					// so we limit nearest cells to that within the range although also including the end represented by the length.
					x = Math.max(x, 0);
					x = Math.min(x, this._options.length);
				}

				return x;
			}
		}, {
			key: "_getDirection",
			value: function _getDirection(xFrom, xTo) {
				var distanceRight = undefined;
				var distanceLeft = undefined;

				if (xTo >= xFrom) {
					// 1
					distanceRight = xTo - xFrom;
					distanceLeft = xFrom + (this._length - xTo);
				} else {
					distanceRight = xTo + (this._length - xFrom);
					distanceLeft = xFrom - xTo;
				}

				return distanceRight < distanceLeft ? 1 : -1;
			}
		}, {
			key: "_getDistanceX",
			value: function _getDistanceX(xFrom, xTo) {
				var direction = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
				var shouldWrap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

				direction = xTo < xFrom ? -1 : 1;
				// no wrap leave from and to as it, and allows compution from outside of the range,
				// otherwise computation is forced within
				if (shouldWrap) {
					xTo = this._modulo(xTo, this._length);
					xFrom = this._modulo(xFrom, this._length);
				}

				// correctly polarised
				var distance = xTo - xFrom;
				if (shouldWrap) {

					var wrappedDistance = Math.min(xTo, xFrom) + (this._length - Math.max(xTo, xFrom));
					if (wrappedDistance < Math.abs(distance)) {

						// polarise wrapped distance as it will by default be positive
						wrappedDistance *= direction;

						return wrappedDistance;
					}
				}

				return distance;
			}
		}, {
			key: "_increment",
			value: function _increment(deltaX) {
				var x = this._x + deltaX;
				this._setX(x);
			}
		}, {
			key: "_setTo",
			value: function _setTo(x) {
				this._setX(x);
			}
		}, {
			key: "_checkAndAdjustPolarityForShortestDistance",
			value: function _checkAndAdjustPolarityForShortestDistance(to, from, length) {
				// example 1
				// to = 10
				// from = 170
				// distance = 10 - 170 = -160
				// reverse = 10 + (180 - 170) = 20
				// return 170 + 20 = 190
				//
				// example 2
				// to = 170
				// from = 10
				// distance = 170 - 10 = 160
				// reverse = 10 + (180 - 170) = 20
				// return 10 - 20 = -10
				var distance = to - from;
				var reverseDistance = 0;
				if (distance < 0) {
					reverseDistance = to + (length - from);
					if (Math.abs(distance) < reverseDistance) {
						return to;
					} else {
						return from + reverseDistance;
					}
				} else {
					reverseDistance = from + (length - to);
					if (distance < reverseDistance) {
						return to;
					} else {
						return from - reverseDistance;
					}
				}
			}
		}, {
			key: "_destroy",
			value: function _destroy() {
				this.removeAllListeners();
			}
		}, {
			key: "_setX",
			value: function _setX(x) {
				var roundedX = undefined;
				var returnX = x;
				var hasChanged = true;

				if (this._wrap === true) {
					x = this._modulo(x, this._length);
				} else if (this._contain) {
					x = Math.min(x, this._length);
					x = Math.max(x, 0);
				}

				//always update the real x whether rounded or not
				this._x = returnX = x;

				if (this._rounded === true) {
					roundedX = Math.round(returnX);
					roundedX = this._modulo(roundedX, this._length);

					if (roundedX !== this._roundedX) {
						this._roundedX = returnX = roundedX;
					} else {
						hasChanged = false;
					}
				}

				if (hasChanged) {
					this.emit(RangeDog.EVENT_UPDATE, returnX);
				}
			}
		}, {
			key: "_getX",
			value: function _getX() {
				var isRounded = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

				return isRounded ? this._roundedX : this._x;
			}

			// thanks deSandro
			// + length and additional modulo operation to handle negative x
		}, {
			key: "_modulo",
			value: function _modulo(x, length) {
				return (x % length + length) % length;
			}
		}, {
			key: "x",
			get: function get() {
				return this._getX(this._rounded);
			},
			set: function set(x) {
				this._setTo(x);
			}
		}]);

		return RangeDog;
	})(_wolfy87Eventemitter2["default"]);

	exports["default"] = RangeDog;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _geomPoint = __webpack_require__(4);

	var _geomPoint2 = _interopRequireDefault(_geomPoint);

	var _DEFAULT_OPTIONS = {
		inputTypes: ["touch", "mouse", "wheel"]
	};

	var InputController = (function () {
		_createClass(InputController, null, [{
			key: "MOUSE_DRAG_MODIFIER",
			value: 2,
			enumerable: true
		}, {
			key: "CLICK_THRESHOLD_DURATION",
			value: 250,
			// milliseconds 500

			enumerable: true
		}, {
			key: "DOUBLE_CLICK_THRESHOLD_DURATION",
			value: 250,
			// milliseconds 500

			enumerable: true
		}, {
			key: "CLICK_THRESHOLD_DISTANCE",
			value: 10,
			// pixels

			enumerable: true
		}, {
			key: "INPUT_TYPE",
			value: {
				"TOUCH": "touch",
				"MOUSE": "mouse",
				"WHEEL": "wheel"
			},
			enumerable: true
		}]);

		function InputController(interactiveElement, options) {
			_classCallCheck(this, InputController);

			this._options = {};
			this._delegate = null;
			this._interactiveElement = null;
			this._originX = 0;
			this._originY = 0;
			this._lastX = 0;
			this._lastY = 0;
			this._deltaX = 0;
			this._deltaY = 0;
			this._downStartTime = 0;
			this._clickStartArray = null;
			this._pointerDown = false;
			this._click = false;
			this._isMac = false;

			this._interactiveElement = interactiveElement;

			this._init(options);
		}

		_createClass(InputController, [{
			key: "_init",
			value: function _init(options) {

				this._options = _extends({}, _DEFAULT_OPTIONS, options);

				this._clickStartArray = [new Date().getTime()]; //start this with a time so we don't have to check later for things.

				this._isMac = navigator.platform.match(/Mac/i) ? true : false;

				this._bindMethods();
			}
		}, {
			key: "_destroy",
			value: function _destroy() {
				clearTimeout(this._singleClickTimeout);
				this._deactivate();
				this._removePostActionEvents();
				this._unbindMethods();
				this._delegate = null;
			}
		}, {
			key: "_bindMethods",
			value: function _bindMethods() {
				this._onPointerDown = this._onPointerDown.bind(this);
				this._onPointerMove = this._onPointerMove.bind(this);
				this._onPointerUp = this._onPointerUp.bind(this);
				this._onPointerCancel = this._onPointerCancel.bind(this);
				this._onMouseWheelHandler = this._onMouseWheelHandler.bind(this);
				this._onClick = this._onClick.bind(this);
				// this._onDOMMouseScrollHandler = ::this._onDOMMouseScrollHandler;
			}
		}, {
			key: "_unbindMethods",
			value: function _unbindMethods() {
				this._onPointerDown = null;
				this._onPointerMove = null;
				this._onPointerUp = null;
				this._onPointerCancel = null;
				this._onMouseWheelHandler = null;
				this._onDOMMouseScrollHandler = null;
				this._onClick = null;
			}
		}, {
			key: "_activate",
			value: function _activate() {
				this._deactivate();

				var inputTypes = this._options.inputTypes.join("");

				if (inputTypes.indexOf(InputController.INPUT_TYPE.WHEEL) > -1) {
					if (this._isMac) {
						this._interactiveElement.addEventListener('wheel', this._onMouseWheelHandler);
					} else {
						this._interactiveElement.addEventListener('DOMMouseScroll', this._onMouseWheelHandler);
						this._interactiveElement.addEventListener('mousewheel', this._onMouseWheelHandler);
					}
				}

				if (inputTypes.indexOf(InputController.INPUT_TYPE.MOUSE) > -1) {
					this._interactiveElement.addEventListener('mousedown', this._onPointerDown);
				}

				if (inputTypes.indexOf(InputController.INPUT_TYPE.TOUCH) > -1) {
					this._interactiveElement.addEventListener('touchstart', this._onPointerDown);
				}

				this._interactiveElement.addEventListener('click', this._onClick, true);
			}
		}, {
			key: "_deactivate",
			value: function _deactivate() {
				this._interactiveElement.removeEventListener('wheel', this._onMouseWheelHandler);
				this._interactiveElement.removeEventListener('mousewheel', this._onMouseWheelHandler);
				this._interactiveElement.removeEventListener('mousedown', this._onPointerDown);
				this._interactiveElement.removeEventListener('touchstart', this._onPointerDown);
				this._interactiveElement.removeEventListener('click', this._onClick, true);
			}
		}, {
			key: "_addPostActionEvents",
			value: function _addPostActionEvents() {
				// use capture phase to ensure we have the oppitunity to stop propagation from these events
				window.addEventListener('mousemove', this._onPointerMove, true);
				window.addEventListener('mouseup', this._onPointerUp, true);
				window.addEventListener('touchmove', this._onPointerMove, true);
				window.addEventListener('touchend', this._onPointerUp, true);
			}
		}, {
			key: "_removePostActionEvents",
			value: function _removePostActionEvents() {
				window.removeEventListener('mousemove', this._onPointerMove, true);
				window.removeEventListener('mouseup', this._onPointerUp, true);
				window.removeEventListener('touchmove', this._onPointerMove, true);
				window.removeEventListener('touchend', this._onPointerUp, true);
			}
		}, {
			key: "_onPointerDown",
			value: function _onPointerDown(event) {
				if (event.targetTouches && event.targetTouches.length !== 1) return false;

				var x = event.targetTouches ? event.targetTouches[0].clientX : event.pageX;
				var y = event.targetTouches ? event.targetTouches[0].clientY : event.pageY;

				this._lastX = this._originX = x;
				this._lastY = this._originY = y;

				this._click = true;

				this._downStartTime = new Date().getTime();

				clearTimeout(this._singleClickTimeout);

				this._addPostActionEvents();

				this._pointerDown = true;

				this._delegate.pointerDown(0, 0, this._lastX, this._lastY, event);

				// event.preventDefault();

				return false;
			}
		}, {
			key: "_onPointerMove",
			value: function _onPointerMove(event) {
				if (event.targetTouches && event.targetTouches.length !== 1) return false;

				var x = event.targetTouches ? event.targetTouches[0].clientX : event.pageX;
				var y = event.targetTouches ? event.targetTouches[0].clientY : event.pageY;

				if (this._pointerDown === true) {
					this._deltaX = x - this._lastX;
					this._deltaY = y - this._lastY;

					if (this._delegate.dragMove !== undefined) {
						this._delegate.dragMove(this._deltaX, this._deltaY, x, y, event);
					}

					this._lastX = x;
					this._lastY = y;
				}

				if (Math.abs(this._deltaX) < Math.abs(this._deltaY) && event.targetTouches) {} else {
					// this stops scroll of the page on iOS, and dragging of image on chrome
					event.preventDefault();
				}

				return false;
			}
		}, {
			key: "_onPointerUp",
			value: function _onPointerUp(event) {
				if (event.targetTouches && event.targetTouches.length > 0) return false;

				var x = event.targetTouches ? this._lastX : event.pageX;
				var y = event.targetTouches ? this._lastY : event.pageY;

				//record the x and y so we can use the coords in single click, and dragEnd
				this._lastX = x;
				this._lastY = y;

				this._pointerDown = false;

				this._removePostActionEvents();

				var confirmedClickOrTap = this._confirmClickOrTap(x, y);
				if (confirmedClickOrTap) {
					return false;
				}

				this._delegate.dragEnd(this._deltaX, this._deltaY, x, y, event);

				event.preventDefault();

				return false;
			}
		}, {
			key: "_onClick",
			value: function _onClick(event) {
				if (event.targetTouches && event.targetTouches.length > 0) return false;

				var x = event.targetTouches ? this._lastX : event.pageX;
				var y = event.targetTouches ? this._lastY : event.pageY;

				var isClick = this._determineClick(x, y);

				if (isClick === false) {
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}, {
			key: "_onPointerCancel",
			value: function _onPointerCancel(event) {}
		}, {
			key: "_confirmClickOrTap",
			value: function _confirmClickOrTap(x, y) {
				var _this = this;

				var isClick = this._determineClick(x, y);

				var timeElapsedSinceLastClick = undefined;

				if (this._click === true && isClick) {

					this._clickStartArray.push(this._downStartTime); //add time of start click to array
					timeElapsedSinceLastClick = this._downStartTime - this._clickStartArray[this._clickStartArray.length - 2]; //duration between this click and last, from mousedown of first click to mousedown of second click

					if (timeElapsedSinceLastClick < InputController.DOUBLE_CLICK_THRESHOLD_DURATION) {
						//if double click duration is below doubleClickThreshold then create double click

						this._onDoubleClick(x, y);
					} else {
						this._singleClickTimeout = setTimeout(function () {
							_this._onSingleClick(x, y);
						}, InputController.DOUBLE_CLICK_THRESHOLD_DURATION); //use timeout on single click to allow for user to double click and overide single click action
					}

					return true;
				}

				return false;
			}
		}, {
			key: "_determineClick",
			value: function _determineClick(x, y) {
				var distanceMoved = _geomPoint2["default"].distance(new _geomPoint2["default"](x, y), new _geomPoint2["default"](this._originX, this._originY)); //check distance moved since mouse down

				var downTimeDuration = new Date().getTime() - this._downStartTime; //check duration of mousedown and mouseup

				return distanceMoved < InputController.CLICK_THRESHOLD_DISTANCE && downTimeDuration < InputController.CLICK_THRESHOLD_DURATION;
			}
		}, {
			key: "_onSingleClick",
			value: function _onSingleClick(x, y) {
				this._delegate.singleClick(this._lastX, this._lastY);
			}
		}, {
			key: "_onDoubleClick",
			value: function _onDoubleClick(x, y) {
				this._delegate.doubleClick(this._lastX, this._lastY);
			}

			// _onDOMMouseScrollHandler(event) {
			// 	if (event.originalEvent) event = event.originalEvent;

			// 	const delta = - event.detail * 3

			// 	this._setMouseWheenDelta(delta, 0, 0);

			// 	event.preventDefault();
			// }

		}, {
			key: "_onMouseWheelHandler",
			value: function _onMouseWheelHandler(event) {

				var delta = -event.deltaY;

				// // const delta = event.wheelDelta || (-event.deltaY * 0.1);
				var deltaX = 0;
				var deltaY = 0;

				// if (event.wheelDeltaX || event.wheelDeltaY) {
				// 	deltaX = event.wheelDeltaX;
				// 	deltaY = event.wheelDeltaY;
				// }

				// delta = this._normalizeWheel(event).pixelY;
				delta = this._normalizeWheelSpeed(event);

				this._setMouseWheenDelta(delta, event);

				event.preventDefault(); //prevent lion browser from bounce scroll effect
			}
		}, {
			key: "_normalizeWheelSpeed",
			value: function _normalizeWheelSpeed(event) {
				var normalized = undefined;
				if (event.wheelDelta) {
					normalized = event.wheelDelta % 120 - 0 == -0 ? event.wheelDelta / 40 : event.wheelDelta / 4; // bringing us 3
				} else {
						var rawAmmount = event.deltaY ? event.deltaY : event.detail;
						normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
					}
				// console.log(normalized);

				return normalized;
			}
		}, {
			key: "_setMouseWheenDelta",
			value: function _setMouseWheenDelta(delta, event) {
				this._delegate.setMouseWheelScrollDelta(delta, event);
			}

			//PUBLIC
			//________________________________________________________________________________________________________________________
		}, {
			key: "isPointerDown",
			value: function isPointerDown() {
				return this._pointerDown;
			}
		}, {
			key: "setDelegate",
			value: function setDelegate(delegate) {
				this._delegate = delegate;
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
			key: "destroy",
			value: function destroy() {
				this._destroy();
			}
		}]);

		return InputController;
	})();

	exports["default"] = InputController;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = (function () {
		function Point(x, y) {
			_classCallCheck(this, Point);

			this.x = x;
			this.y = y;
		}

		_createClass(Point, [{
			key: "toString",
			value: function toString() {
				return "Point x:" + this.x + " y:" + this.y;
			}
		}], [{
			key: "distance",
			value: function value(p1, p2) {
				return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
			},
			enumerable: true
		}]);

		return Point;
	})();

	exports["default"] = Point;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Utils = __webpack_require__(6);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Easing = __webpack_require__(7);

	var Easing = _interopRequireWildcard(_Easing);

	var _animatorsCubicBezier = __webpack_require__(8);

	var _animatorsCubicBezier2 = _interopRequireDefault(_animatorsCubicBezier);

	var _animatorsEase = __webpack_require__(9);

	var _animatorsEase2 = _interopRequireDefault(_animatorsEase);

	var _animatorsFriction = __webpack_require__(10);

	var _animatorsFriction2 = _interopRequireDefault(_animatorsFriction);

	var _animatorsSpring = __webpack_require__(11);

	var _animatorsSpring2 = _interopRequireDefault(_animatorsSpring);

	var _animatorsSpringRK4 = __webpack_require__(12);

	var _animatorsSpringRK42 = _interopRequireDefault(_animatorsSpringRK4);

	var MotionTween = (function () {
	  _createClass(MotionTween, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      time: 1000,
	      startValue: 0,
	      endValue: 1,
	      animatorType: _animatorsFriction2["default"].Type,
	      animatorOptions: null, // use defaults of selected type
	      update: function update() {},
	      complete: function complete() {}
	    },
	    enumerable: true
	  }, {
	    key: "easingFunction",
	    value: {
	      easeInQuad: Easing.easeInQuad,
	      easeOutQuad: Easing.easeOutQuad,
	      easeInOutQuad: Easing.easeInOutQuad,
	      swing: Easing.swing,
	      easeInCubic: Easing.easeInCubic,
	      easeOutCubic: Easing.easeOutCubic,
	      easeInOutCubic: Easing.easeInOutCubic,
	      easeInQuart: Easing.easeInQuart,
	      easeOutQuart: Easing.easeOutQuart,
	      easeInOutQuart: Easing.easeInOutQuart,
	      easeInQuint: Easing.easeInQuint,
	      easeOutQuint: Easing.easeOutQuint,
	      easeInOutQuint: Easing.easeInOutQuint,
	      easeInSine: Easing.easeInSine,
	      easeOutSine: Easing.easeOutSine,
	      easeInOutSine: Easing.easeInOutSine,
	      easeInExpo: Easing.easeInExpo,
	      easeOutExpo: Easing.easeOutExpo,
	      easeInOutExpo: Easing.easeInOutExpo,
	      easeInCirc: Easing.easeInCirc,
	      easeOutCirc: Easing.easeOutCirc,
	      easeInOutCirc: Easing.easeInOutCirc,
	      easeInElastic: Easing.easeInElastic,
	      easeOutElastic: Easing.easeOutElastic,
	      easeInOutElastic: Easing.easeInOutElastic,
	      easeInBack: Easing.easeInBack,
	      easeOutBack: Easing.easeOutBack,
	      easeInOutBack: Easing.easeInOutBack,
	      easeInBounce: Easing.easeInBounce,
	      easeOutBounce: Easing.easeOutBounce,
	      easeInOutBounce: Easing.easeInOutBounce
	    },
	    enumerable: true
	  }, {
	    key: "animatorType",
	    value: {
	      spring: _animatorsSpring2["default"].Type,
	      springRK4: _animatorsSpringRK42["default"].Type,
	      friction: _animatorsFriction2["default"].Type,
	      ease: _animatorsEase2["default"].Type,
	      cubicBezier: _animatorsCubicBezier2["default"].Type
	    },
	    enumerable: true
	  }]);

	  function MotionTween(options) {
	    _classCallCheck(this, MotionTween);

	    this._time = null;
	    this._startX = null;
	    this._endX = null;
	    this._lastTime = null;
	    this._startTime = null;
	    this._options = {};
	    this._isAnimating = false;
	    this._animator = null;
	    this._x = null;

	    this._init(options);
	    return this;
	  }

	  _createClass(MotionTween, [{
	    key: "start",
	    value: function start() {
	      this._start();
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._destroy();
	    }
	  }, {
	    key: "_init",
	    value: function _init(options) {
	      // Deep merge of default and incoming options
	      _Utils2["default"].extend(this._options, MotionTween.DEFAULT_OPTIONS, true);
	      _Utils2["default"].extend(this._options, options, true);

	      // time we can ignore for some of the animators
	      this._time = this._options.time;
	      this._startX = this._options.startValue;
	      this._endX = this._options.endValue;
	    }
	  }, {
	    key: "_start",
	    value: function _start() {
	      this._lastTime = 0;
	      this._startTime = 0;

	      switch (this._options.animatorType) {
	        case _animatorsSpring2["default"].Type:
	          this._animator = new _animatorsSpring2["default"](this._options.animatorOptions);
	          break;
	        case _animatorsSpringRK42["default"].Type:
	          this._animator = new _animatorsSpringRK42["default"](this._options.animatorOptions);
	          break;
	        case _animatorsFriction2["default"].Type:
	          this._animator = new _animatorsFriction2["default"](this._options.animatorOptions);
	          break;
	        case _animatorsCubicBezier2["default"].Type:
	          this._animator = new _animatorsCubicBezier2["default"](this._options.animatorOptions);
	          break;
	        default:
	          this._animator = new _animatorsEase2["default"](this._options.animatorOptions);
	      }

	      this._isAnimating = true;
	      this._startTime = this._lastTime = new Date().getTime();

	      this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
	    }
	  }, {
	    key: "_destroy",
	    value: function _destroy() {
	      window.cancelAnimationFrame(this._requestionAnimationFrameID);
	      this._options = null;
	    }
	  }, {
	    key: "_tick",
	    value: function _tick() {
	      var now = new Date().getTime();

	      var delta = (now - this._lastTime) / this._time;
	      this._lastTime = now;

	      // pass in normalised delta
	      var normalisedAnimatedX = this._animator.step(delta);

	      if (this._animator.isFinished() === false) {
	        this._x = this._startX + (this._endX - this._startX) * normalisedAnimatedX;
	        this._options.update(this._x);
	        this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
	      } else {
	        this._x = this._endX;
	        this._options.update(this._x);
	        this._options.complete();
	        this._isAnimating = false;
	      }
	    }
	  }], [{
	    key: "getValue",
	    value: function getValue(animatorType, animatorOptions, time) {
	      return MotionTween._getValue(animatorType, animatorOptions, time);
	    }
	  }, {
	    key: "_getValue",
	    value: function _getValue(animatorType, animatorOptions, time) {
	      switch (animatorType) {
	        case _animatorsCubicBezier2["default"].Type:
	          return _animatorsCubicBezier2["default"].getValue(animatorOptions, time);
	          break;
	        default:
	          return _animatorsEase2["default"].getValue(animatorOptions, time);
	      }
	    }
	  }]);

	  return MotionTween;
	})();

	exports["default"] = MotionTween;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Utils = (function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, [{
	        key: 'extend',
	        value: function extend(destination, source) {
	            var isDeep = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            var hasDepth = false;
	            for (var property in source) {
	                hasDepth = false;
	                if (isDeep === true && source[property] && source[property].constructor) {
	                    if (source[property].constructor === Object) {
	                        hasDepth = true;
	                        destination[property] = this.extend({}, source[property], true);
	                    } else if (source[property].constructor === Function) {
	                        // if (window.console) console.warn("Can't clone, can only reference Functions");
	                        hasDepth = false;
	                    }
	                }
	                if (hasDepth === false) {
	                    destination[property] = source[property];
	                }
	            }
	            return destination;
	        }
	    }, {
	        key: 'sum',
	        value: function sum(arr) {
	            var sum = 0;
	            var d = arr.length;
	            while (d--) {
	                sum += arr[d];
	            }
	            return sum;
	        }
	    }]);

	    return Utils;
	})();

	exports['default'] = new Utils();

	(function () {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function (callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function () {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }

	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function (id) {
	            clearTimeout(id);
	        };
	    }
	})();
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	// t: current time, b: begInnIng value, c: change In value, d: duration
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.swing = swing;
	exports.easeInQuad = easeInQuad;
	exports.easeOutQuad = easeOutQuad;
	exports.easeInOutQuad = easeInOutQuad;
	exports.easeInCubic = easeInCubic;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	exports.easeInQuart = easeInQuart;
	exports.easeOutQuart = easeOutQuart;
	exports.easeInOutQuart = easeInOutQuart;
	exports.easeInQuint = easeInQuint;
	exports.easeOutQuint = easeOutQuint;
	exports.easeInOutQuint = easeInOutQuint;
	exports.easeInSine = easeInSine;
	exports.easeOutSine = easeOutSine;
	exports.easeInOutSine = easeInOutSine;
	exports.easeInExpo = easeInExpo;
	exports.easeOutExpo = easeOutExpo;
	exports.easeInOutExpo = easeInOutExpo;
	exports.easeInCirc = easeInCirc;
	exports.easeOutCirc = easeOutCirc;
	exports.easeInOutCirc = easeInOutCirc;
	exports.easeInElastic = easeInElastic;
	exports.easeOutElastic = easeOutElastic;
	exports.easeInOutElastic = easeInOutElastic;
	exports.easeInBack = easeInBack;
	exports.easeOutBack = easeOutBack;
	exports.easeInOutBack = easeInOutBack;
	exports.easeInBounce = easeInBounce;
	exports.easeOutBounce = easeOutBounce;
	exports.easeInOutBounce = easeInOutBounce;

	function swing(t, b, c, d) {
		return easeOutQuad(t, b, c, d);
	}

	function easeInQuad(t, b, c, d) {
		return c * (t /= d) * t + b;
	}

	function easeOutQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	}

	function easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * (--t * (t - 2) - 1) + b;
	}

	function easeInCubic(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}

	function easeOutCubic(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function easeInOutCubic(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	function easeInQuart(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	}

	function easeOutQuart(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	function easeInOutQuart(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	function easeInQuint(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	}

	function easeOutQuint(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	function easeInOutQuint(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}

	function easeInSine(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}

	function easeOutSine(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	function easeInOutSine(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}

	function easeInExpo(t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	function easeOutExpo(t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}

	function easeInOutExpo(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}

	function easeInCirc(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}

	function easeOutCirc(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	function easeInOutCirc(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}

	function easeInElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}

	function easeOutElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	}

	function easeInOutElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	}

	function easeInBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}

	function easeOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}

	function easeInOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}

	function easeInBounce(t, b, c, d) {
		return c - easeOutBounce(d - t, 0, c, d) + b;
	}

	function easeOutBounce(t, b, c, d) {
		if ((t /= d) < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		} else if (t < 2 / 2.75) {
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
		} else if (t < 2.5 / 2.75) {
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
		}
	}

	function easeInOutBounce(t, b, c, d) {
		if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * .5 + b;
		return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CubicBezier = (function () {
	  _createClass(CubicBezier, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      tolerance: 0.001,
	      controlPoints: [.15, .66, .83, .67]
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "CubicBezier",
	    enumerable: true
	  }]);

	  function CubicBezier(options) {
	    _classCallCheck(this, CubicBezier);

	    // merge default with passed
	    this._options = _extends({}, CubicBezier.DEFAULT_OPTIONS, options);

	    this._x = 0;
	    this._time = 0;
	  }

	  _createClass(CubicBezier, [{
	    key: "step",
	    value: function step(delta) {
	      // t: current time, b: begInnIng value, c: change In value, d: duration
	      this._time += delta;
	      this._x = CubicBezier._getPointOnBezierCurve(this._options.controlPoints, this._time);
	      return this._x;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return this._time >= 1;
	    }
	  }], [{
	    key: "getValue",
	    value: function getValue(options, time) {
	      return CubicBezier._getPointOnBezierCurve(options.controlPoints, time);
	    }
	  }, {
	    key: "_getPointOnBezierCurve",
	    value: function _getPointOnBezierCurve(controlPoints, l) {
	      var a1 = { x: 0, y: 0 };
	      var a2 = { x: 1, y: 1 };

	      var c1 = { x: controlPoints[0], y: controlPoints[1] };
	      var c2 = { x: controlPoints[2], y: controlPoints[3] };

	      var b1 = CubicBezier._interpolate(a1, c1, l);
	      var b2 = CubicBezier._interpolate(c1, c2, l);
	      var b3 = CubicBezier._interpolate(c2, a2, l);

	      c1 = CubicBezier._interpolate(b1, b2, l);
	      c2 = CubicBezier._interpolate(b2, b3, l);

	      return CubicBezier._interpolate(c1, c2, l).y;
	    }
	  }, {
	    key: "_interpolate",
	    value: function _interpolate(p1, p2, l) {
	      var p3 = {};

	      p3.x = p1.x + (p2.x - p1.x) * l;
	      p3.y = p1.y + (p2.y - p1.y) * l;

	      return p3;
	    }
	  }]);

	  return CubicBezier;
	})();

	exports["default"] = CubicBezier;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Easing = __webpack_require__(7);

	var Easing = _interopRequireWildcard(_Easing);

	var Ease = (function () {
	  _createClass(Ease, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      tolerance: 0.001,
	      easingFunction: Easing.easeOutQuad
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "Ease",
	    enumerable: true
	  }]);

	  function Ease(options) {
	    _classCallCheck(this, Ease);

	    // merge default with passed
	    this._options = _extends({}, Ease.DEFAULT_OPTIONS, options);

	    this._x = 0;
	    this._time = 0;
	  }

	  _createClass(Ease, [{
	    key: "step",
	    value: function step(delta) {
	      // t: current time, b: begInnIng value, c: change In value, d: duration
	      this._time += delta;
	      this._x = this._options.easingFunction(this._time, 0, 1, 1);
	      return this._x;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return this._time >= 1;
	    }
	  }], [{
	    key: "getValue",
	    value: function getValue(options, time) {
	      return options.easingFunction(time, 0, 1, 1);
	    }
	  }]);

	  return Ease;
	})();

	exports["default"] = Ease;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Friction = (function () {
	  _createClass(Friction, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      applyAcceleration: function applyAcceleration(accel) {
	        return accel;
	      },
	      friction: 0.1,
	      destination: 1,
	      tolerance: 0.001
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "FRICTION",
	    enumerable: true
	  }]);

	  function Friction(options) {
	    _classCallCheck(this, Friction);

	    // merge default with passed
	    this._options = _extends({}, Friction.DEFAULT_OPTIONS, options);
	    this._v = 0;
	    this._x = 0;
	    this._acceleration = (this._options.destination - this._x) * this._options.friction;
	    this._previousX = 0;
	  }

	  _createClass(Friction, [{
	    key: "step",
	    value: function step(delta) {
	      // delta is ignored in the FrictionAnimator
	      this._acceleration = this._options.applyAcceleration(this._acceleration);

	      this._v += this._acceleration;
	      this._x += this._v;
	      this._v *= 1 - this._options.friction;

	      // reset the acceleration as this is set initially
	      this._acceleration = 0;
	      this._previousX = this._x;

	      return this._x;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === 1 / this._options.tolerance ? true : false;
	    }
	  }]);

	  return Friction;
	})();

	exports["default"] = Friction;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Spring = (function () {
	  _createClass(Spring, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      stiffness: 100,
	      damping: 20,
	      tolerance: 0.001
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "SPRING",
	    enumerable: true
	  }]);

	  function Spring(options) {
	    _classCallCheck(this, Spring);

	    // merge default with passed
	    this._options = _extends({}, Spring.DEFAULT_OPTIONS, options);

	    this._v = 0;
	    this._x = 0;
	  }

	  _createClass(Spring, [{
	    key: "step",
	    value: function step(delta) {
	      var k = 0 - this._options.stiffness;
	      var b = 0 - this._options.damping;

	      var F_spring = k * (this._x - 1);
	      var F_damper = b * this._v;

	      var mass = 1;

	      this._v += (F_spring + F_damper) / mass * delta;
	      this._x += this._v * delta;

	      return this._x;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === 1 / this._options.tolerance ? true : false;
	    }
	  }]);

	  return Spring;
	})();

	exports["default"] = Spring;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports) {

	// r4k from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpringRK4 = (function () {
	  _createClass(SpringRK4, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      stiffness: 100,
	      damping: 20,
	      tolerance: 0.001
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "SPRINGRK4",
	    enumerable: true
	  }]);

	  function SpringRK4(options) {
	    _classCallCheck(this, SpringRK4);

	    // merge default with passed
	    this._options = _extends({}, SpringRK4.DEFAULT_OPTIONS, options);

	    // set position to 1 as we are wanting the result normalised
	    this._state = {
	      x: 1,
	      v: 0
	    };
	  }

	  _createClass(SpringRK4, [{
	    key: "_rk4",
	    value: function _rk4(state, a, dt) {
	      var x = state.x;
	      var v = state.v;
	      // Returns final (position, velocity) array after time dt has passed.
	      //        x: initial position
	      //        v: initial velocity
	      //        a: acceleration function a(x,v,dt) (must be callable)
	      //        dt: timestep
	      var x1 = x;
	      var v1 = v;
	      var a1 = a(x1, v1, 0);

	      var x2 = x + 0.5 * v1 * dt;
	      var v2 = v + 0.5 * a1 * dt;
	      var a2 = a(x2, v2, dt / 2);

	      var x3 = x + 0.5 * v2 * dt;
	      var v3 = v + 0.5 * a2 * dt;
	      var a3 = a(x3, v3, dt / 2);

	      var x4 = x + v3 * dt;
	      var v4 = v + a3 * dt;
	      var a4 = a(x4, v4, dt);

	      var xf = x + dt / 6 * (v1 + 2 * v2 + 2 * v3 + v4);
	      var vf = v + dt / 6 * (a1 + 2 * a2 + 2 * a3 + a4);

	      return {
	        x: xf,
	        v: vf
	      };
	    }
	  }, {
	    key: "_acceleration",
	    value: function _acceleration(x, v, dt) {
	      // This particular one models a spring with a 1kg mass
	      return -this._options.stiffness * x - this._options.damping * v;
	    }
	  }, {
	    key: "step",
	    value: function step(delta) {
	      this._state = this._rk4(this._state, this._acceleration.bind(this), delta);
	      // the calculation gives values starting from 1 and then finishing at 0,
	      // we need to transform the values to work from 0 to 1.
	      return (this._state.x - 1) * -1;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._state.v / this._options.tolerance) === 0 && Math.round(this._state.x / this._options.tolerance) === 0 ? true : false;
	    }
	  }]);

	  return SpringRK4;
	})();

	exports["default"] = SpringRK4;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;