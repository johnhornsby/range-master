import EventEmitter from "wolfy87-eventemitter";
import Rangedog from "range-dog";
import InputController from "./InputController";
import MotionTween from "motion-tween";


const _DEFAULT_OPTIONS = {
	length: 1,
	frameLength:1,
	cellLength:1,
	wrap: false,
	inertia: true,
	rounded: false,
	snap: true,
	target: null,
	contain: false,
	animatorType: MotionTween.animatorType.friction,
	animatorOptions: {},
	mouseDeltaToRangeUnitRatio: () => 1,
	inputOptions: {
		inputTypes: [
			InputController.INPUT_TYPE.MOUSE,
			InputController.INPUT_TYPE.TOUCH,
			InputController.INPUT_TYPE.WHEEL
		]
	}
}


export default class RangeMaster extends EventEmitter {


	static tweenType = {
		"INERTIA": 0,
		"SLIDE_TO": 1,
		"SNAP_TO": 2,
		"INERTIA_BOUNCE": 3
	};

	static EVENT_UPDATE = 'eventUpdate';

	static EVENT_CLICK = 'eventClick';

	static EVENT_DRAG_COMPLETE = 'eventDragComplete';

	static EVENT_DRAG_MOVE = 'eventDragMove';

	static EVENT_DOUBLE_CLICK = 'eventDoubleClick';

	static EVENT_SLIDE_COMPLETE = 'eventSlideComplete';

	static EVENT_POINTER_DOWN = 'eventPointerDown';


	static INERTIA_TIMEOUT = 100;

	static OUT_OF_RANGE_DRAG_MODIFIER = 0.25;



	_options = {};

	_rangedog = null;

	_inputController = null;

	_deltas = [];

	_cellIndex = 0;

	_friction = 0.075;

	_motionTween = null;

	_tweenType = null;

	_length = 1;

	_cellLength = 1;

	_wrap = false;

	_inertia = true;

	_rounded = false;

	_snap = false;

	_target = null;

	_mouseDeltaToRangeUnitRatio = null;






	constructor(options) {
		super();

		this._init(options);
	}









	/*_______________________________________________

	Public Methods
	_______________________________________________*/

	destroy() { this._destroy() }


	slideToNextCell() {
		if (this._tweenType !== RangeMaster.tweenType.SLIDE_TO) {
			this._updateCellIndex();
		}

		return this._slideToCellIndex(this._getNextCellIndex(1), 1);
	}


	slideToPreviousCell() {
		if (this._tweenType !== RangeMaster.tweenType.SLIDE_TO) {
			this._updateCellIndex();
		}

		return this._slideToCellIndex(this._getNextCellIndex(-1), -1);
	}


	slideToCellIndex(index) {
		this._updateCellIndex();

		return this._slideToCellIndex(index, 0);
	}


	activate() { this._activate() }


	deactivate() { this._deactivate() }


	get cellIndex() { return this._cellIndex }


	get x() { return this._rangedog.x }







	/*_______________________________________________

	Input Controller Event Handlers
	_______________________________________________*/

	setMouseWheelScrollDelta(delta, event) {
		//console.log(`setMouseWheelScrollDelta delta:${delta}`);

		// currently stopping mouse interaction when snap is on, as we have no way of determining a scroll stop event
		if (this._snap === false) {
			this._stopAllAnimation();
			this._onDragMove(delta, 0, 0, 0, "mouseWheel");
		}
	}


	dragEnd(deltaX, deltaY, x, y, event) {
		// console.log(`dragEnd deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

		this._activatePostDragBehaviour();

		// reset deltas array, as we will want to know the start
		this._deltas = [];

		this.emit(RangeMaster.EVENT_DRAG_COMPLETE, x, y, event);

	}


	dragMove(deltaX, deltaY, x, y, event) {
		// console.log(`dragMove deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

		this._onDragMove(deltaX, deltaY, x, y, "pointer");

		this.emit(RangeMaster.EVENT_DRAG_MOVE, deltaX, deltaY, event);
	}


	pointerDown(deltaX, deltaY, x, y, event) {
		//console.log(`pointerDown deltaX:${deltaX} deltaY:${deltaY} x:${x} y:${y}`);

		this._stopAllAnimation();

		this.emit(RangeMaster.EVENT_POINTER_DOWN, x, y, event);
	}


	singleClick(x, y) {
		this.emit(RangeMaster.EVENT_CLICK, x, y);
	}


	doubleClick(x, y) {
		this.emit(RangeMaster.EVENT_DOUBLE_CLICK, x, y);
	}










	/*_______________________________________________

	RangeDog Event Handlers
	_______________________________________________*/

	_onRangeUpdate(x) {
		// console.log(`_onRangeUpdate ${x}`);
		this.emit(RangeMaster.EVENT_UPDATE, x);
	}











	/*_______________________________________________

	Private Methods
	_______________________________________________*/

	_init(options) {
		this._options = {
			..._DEFAULT_OPTIONS,
			...options
		}

		this._length = this._options.length;

		this._cellLength = this._options.cellLength;

		this._wrap = this._options.wrap;

		this._inertia = this._options.inertia;

		this._rounded = this._options.rounded;

		this._snap = this._options.snap;

		this._target = this._options.target;

		this._mouseDeltaToRangeUnitRatio = this._options.mouseDeltaToRangeUnitRatio;


		this._bindMethods();


		this._inputController = new InputController(this._target, this._options.inputOptions);
		this._inputController.setDelegate(this);
		this._inputController.activate();

		const rangeDogOptions = {
			...this._options
		};

		this._rangedog = new Rangedog(rangeDogOptions);
		this._rangedog.on(Rangedog.EVENT_UPDATE, this._onRangeUpdate);
	}


	_bindMethods() {
		this._onRangeUpdate = ::this._onRangeUpdate;
		this._motionTweenUpdate = ::this._motionTweenUpdate;
		this._motionTweenComplete = ::this._motionTweenComplete;
	}


	_unbindMethods() {
		this._onRangeUpdate = null;
		this._motionTweenUpdate = null;
		this._motionTweenComplete = null;
	}


	_onDragMove(deltaX, deltaY, x, y, input) {
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
		const deltaData = {deltaX:deltaX, deltaY:deltaY, x:x, y:y, time: new Date().getTime(), input: input};
		this._deltas.push(deltaData);

		// sets to the nearest cell index
		this._cellIndex = Math.round((this._rangedog.x + deltaX) / this._cellLength);

		// we use increment here, because when getting rangedog x we get the rounded value, we need to append this delta to the real float
		this._rangedog.increment(deltaX);
	}


	_updateCellIndex() {
		this._cellIndex = Math.round(this._rangedog.x / this._cellLength);
	}


	_getNextCellIndex(polarity) {
		let prospectiveIndex = this._cellIndex + polarity;
		if (this._wrap === false) {
			if (prospectiveIndex < 0) {
				prospectiveIndex = 0;
			} else if (prospectiveIndex > this._length / this._cellLength) {
				prospectiveIndex = this._length / this._cellLength;
			}
		}

		return prospectiveIndex;
	}


	_activatePostDragBehaviour() {
		const deltaInfo = this._deltas[this._deltas.length-1];
		let hasInertia = true;
		let velocity = 0;
		let destination = this._rangedog.x;
		let tweenType = RangeMaster.tweenType.INERTIA;

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

			const deltasX = this._deltas.map(deltaInfo => deltaInfo.deltaX);
			const inertiaDirection = deltasX.reduce((prev, next) => prev + next);

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

				destination = this._rangedog.x + (velocity / this._friction);

				if (this._wrap === false && (destination < 0 || destination > this._length)) {
					tweenType = RangeMaster.tweenType.INERTIA_BOUNCE;
				}
			} else {
				if (this._wrap === false && this._rangedog.x < 0) {
					destination = 0;
				} else if (this._wrap === false && this._rangedog.x > this._length ) {
					destination = this._length;
				}

				tweenType = RangeMaster.tweenType.SNAP_TO;
			} 
		}

		if (destination !== this._rangedog.x) {
			this._tweenTo(destination, tweenType);
		}
	}


	_slideToCellIndex(index, polarity = 0) {
		if (this._wrap === true) {
			this._cellIndex = this._rangedog.modulo(index * this._cellLength) / this._cellLength;
		} else {
			this._cellIndex = index;
		}

		let destination = index * this._cellLength;

		const moduloDestinaton = this._rangedog.modulo(destination)

		// check need to wrap from left to right
		if (polarity < 0 && moduloDestinaton > this._rangedog.x) {
			// recalculate destination
			destination  = -(this._length - moduloDestinaton);
		}

		// check need to wrap from right to left
		if (polarity > 0 && moduloDestinaton < this._rangedog.x) {
			// recalculate destination
			destination  = this._length + moduloDestinaton;
		}

		//console.log(`_slideToCellIndex: index=${index} this._cellIndex=${this._cellIndex} polarity=${polarity} destination=${destination}`);

		this._tweenTo(destination, RangeMaster.tweenType.SLIDE_TO);

		return this._cellIndex;
	}


	_tweenTo(x, type) {
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

		const tweenConfig = {
			startValue: this._rangedog.x,
			endValue: x,
			animatorType: this._options.animatorType,
			animatorOptions: this._options.animatorOptions, // use defaults of selected type
			update: this._motionTweenUpdate,
			complete: this._motionTweenComplete
		};

		// @todo look at a better way to allow user to customise all animation types and options
		switch(type) {
			case RangeMaster.tweenType.INERTIA_BOUNCE:
				tweenConfig.animatorType = MotionTween.animatorType.spring;
				tweenConfig.animatorOptions = {
					stiffness: 125,
    				damping: 15
				}
				break;
		}

		this._motionTween = new MotionTween(tweenConfig);

		this._motionTween.start();

		//console.log(`_slideTo: originX=${this._rangedog.x}  x=${x}`);
	}


	_motionTweenUpdate(x) {
		this._rangedog.x = x;
	}


	_motionTweenComplete() {
		this._cellIndex = Math.round(this._rangedog.x / this._cellLength);

		this._stopAllAnimation();

		this.emit(RangeMaster.EVENT_SLIDE_COMPLETE);
	}


	_stopAllAnimation() {
		if (this._motionTween != null) {
			this._motionTween.destroy();
			this._motionTween = null;
		}

		this._tweenType = null;
	}


	_activate() {
		this._inputController.activate();
	}


	_deactivate() {
		this._inputController.deactivate();
	}


	_destroy() {
		this._rangedog.off(Rangedog.EVENT_UPDATE, this._onRangeUpdate);
		this._rangedog = null;
		this._onRangeUpdate = null;

		this._inputController.destroy();
		this._inputController = null;

		this._stopAllAnimation();
		this.removeAllListeners();
	}
}