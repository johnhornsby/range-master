'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _geomPoint = require('./geom/Point');

var _geomPoint2 = _interopRequireDefault(_geomPoint);

var InputController = (function () {
	_createClass(InputController, null, [{
		key: 'MOUSE_DRAG_MODIFIER',
		value: 2,
		enumerable: true
	}, {
		key: 'CLICK_THRESHOLD_DURATION',
		value: 250,
		// milliseconds 500

		enumerable: true
	}, {
		key: 'DOUBLE_CLICK_THRESHOLD_DURATION',
		value: 250,
		// milliseconds 500

		enumerable: true
	}, {
		key: 'CLICK_THRESHOLD_DISTANCE',
		value: 10,
		// pixels

		enumerable: true
	}]);

	function InputController(interactiveElement) {
		_classCallCheck(this, InputController);

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

		this._init();
	}

	_createClass(InputController, [{
		key: '_init',
		value: function _init() {
			this._clickStartArray = [new Date().getTime()]; //start this with a time so we don't have to check later for things.

			this._isMac = navigator.platform.match(/Mac/i) ? true : false;

			this._bindMethods();
		}
	}, {
		key: '_destroy',
		value: function _destroy() {
			this._unbindMethods();
		}
	}, {
		key: '_bindMethods',
		value: function _bindMethods() {
			this._onPointerDown = this._onPointerDown.bind(this);
			this._onPointerMove = this._onPointerMove.bind(this);
			this._onPointerUp = this._onPointerUp.bind(this);
			this._onPointerCancel = this._onPointerCancel.bind(this);
			this._onMouseWheelHandler = this._onMouseWheelHandler.bind(this);
			// this._onDOMMouseScrollHandler = ::this._onDOMMouseScrollHandler;
		}
	}, {
		key: '_unbindMethods',
		value: function _unbindMethods() {
			this._onPointerDown = null;
			this._onPointerMove = null;
			this._onPointerUp = null;
			this._onPointerCancel = null;
			this._onMouseWheelHandler = null;
			this._onDOMMouseScrollHandler = null;
		}
	}, {
		key: '_activate',
		value: function _activate() {
			if (this._isMac) {
				this._interactiveElement.addEventListener('wheel', this._onMouseWheelHandler);
			} else {
				this._interactiveElement.addEventListener('DOMMouseScroll', this._onMouseWheelHandler);
				this._interactiveElement.addEventListener('mousewheel', this._onMouseWheelHandler);
			}

			this._interactiveElement.addEventListener('mousedown', this._onPointerDown);
			this._interactiveElement.addEventListener('touchstart', this._onPointerDown);
		}
	}, {
		key: '_deactivate',
		value: function _deactivate() {

			this._interactiveElement.removeEventListener('wheel', this._onMouseWheelHandler);
			this._interactiveElement.removeEventListener('mousewheel', this._onMouseWheelHandler);
			this._interactiveElement.removeEventListener('mousewheel', this._onMouseWheelHandler);
			this._interactiveElement.removeEventListener('mousedown', this._onPointerDown);
			this._interactiveElement.removeEventListener('touchstart', this._onPointerDown);
		}
	}, {
		key: '_addPostActionEvents',
		value: function _addPostActionEvents() {
			window.addEventListener('mousemove', this._onPointerMove);
			window.addEventListener('mouseup', this._onPointerUp);
			window.addEventListener('touchmove', this._onPointerMove);
			window.addEventListener('touchend', this._onPointerUp);
		}
	}, {
		key: '_removePostActionEvents',
		value: function _removePostActionEvents() {
			window.removeEventListener('mousemove', this._onPointerMove);
			window.removeEventListener('mouseup', this._onPointerUp);
			window.removeEventListener('touchmove', this._onPointerMove);
			window.removeEventListener('touchend', this._onPointerUp);
		}
	}, {
		key: '_onPointerDown',
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

			this._delegate.pointerDown(0, 0, this._lastX, this._lastY);

			// event.preventDefault();

			return false;
		}
	}, {
		key: '_onPointerMove',
		value: function _onPointerMove(event) {
			if (event.targetTouches && event.targetTouches.length !== 1) return false;

			var x = event.targetTouches ? event.targetTouches[0].clientX : event.pageX;
			var y = event.targetTouches ? event.targetTouches[0].clientY : event.pageY;

			if (this._pointerDown === true) {
				this._deltaX = x - this._lastX;
				this._deltaY = y - this._lastY;

				if (this._delegate.dragMove !== undefined) {
					this._delegate.dragMove(this._deltaX, this._deltaY, x, y);
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
		key: '_onPointerUp',
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

			this._delegate.dragEnd(this._deltaX, this._deltaY, x, y);

			event.preventDefault();

			return false;
		}
	}, {
		key: '_onPointerCancel',
		value: function _onPointerCancel(event) {}
	}, {
		key: '_confirmClickOrTap',
		value: function _confirmClickOrTap(x, y) {
			var _this = this;

			var distanceMoved = _geomPoint2['default'].distance(new _geomPoint2['default'](x, y), new _geomPoint2['default'](this._originX, this._originY)); //check distance moved since mouse down

			var downTimeDuration = new Date().getTime() - this._downStartTime; //check duration of mousedown and mouseup
			var timeElapsedSinceLastClick = undefined;

			if (this._click === true && distanceMoved < InputController.CLICK_THRESHOLD_DISTANCE && downTimeDuration < InputController.CLICK_THRESHOLD_DURATION) {

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
		key: '_onSingleClick',
		value: function _onSingleClick(x, y) {
			this._delegate.singleClick(this._lastX, this._lastY);
		}
	}, {
		key: '_onDoubleClick',
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
		key: '_onMouseWheelHandler',
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

			this._setMouseWheenDelta(delta);

			event.preventDefault(); //prevent lion browser from bounce scroll effect
		}
	}, {
		key: '_normalizeWheelSpeed',
		value: function _normalizeWheelSpeed(event) {
			var normalized = undefined;
			if (event.wheelDelta) {
				normalized = event.wheelDelta % 120 - 0 == -0 ? event.wheelDelta / 40 : event.wheelDelta / 4; // bringing us 3
			} else {
					var rawAmmount = event.deltaY ? event.deltaY : event.detail;
					normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
				}
			console.log(normalized);

			return normalized;
		}
	}, {
		key: '_setMouseWheenDelta',
		value: function _setMouseWheenDelta(delta) {
			this._delegate.setMouseWheelScrollDelta(delta);
		}

		//PUBLIC
		//________________________________________________________________________________________________________________________
	}, {
		key: 'isPointerDown',
		value: function isPointerDown() {
			return this._pointerDown;
		}
	}, {
		key: 'setDelegate',
		value: function setDelegate(delegate) {
			this._delegate = delegate;
		}
	}, {
		key: 'activate',
		value: function activate() {
			this._activate();
		}
	}, {
		key: 'deactivate',
		value: function deactivate() {
			this._deactivate();
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this._destroy();
		}
	}]);

	return InputController;
})();

exports['default'] = InputController;
module.exports = exports['default'];