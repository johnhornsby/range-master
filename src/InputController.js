import Point from './geom/Point';


export default class InputController {

	static MOUSE_DRAG_MODIFIER = 2;

	static CLICK_THRESHOLD_DURATION = 250; // milliseconds 500

	static DOUBLE_CLICK_THRESHOLD_DURATION = 250;// milliseconds 500

	static CLICK_THRESHOLD_DISTANCE = 10; // pixels


	_delegate = null;
	
	_interactiveElement = null;
	
	_originX = 0;
	
	_originY = 0;
	
	_lastX = 0;
	
	_lastY = 0;
	
	_deltaX = 0;
	
	_deltaY = 0;
	
	_downStartTime = 0;
	
	_clickStartArray = null;
		
	_singleClickTimeout;
	
	_pointerDown = false;
	
	_click = false;

	_isMac = false;


	constructor (interactiveElement){

		this._interactiveElement = interactiveElement;

		this._init();
	}





	
	_init() {
		this._clickStartArray = [new Date().getTime()];//start this with a time so we don't have to check later for things.

		this._isMac = navigator.platform.match(/Mac/i)?true:false;

		this._bindMethods();
	}


	_destroy() {
		this._unbindMethods();
	}


	_bindMethods() {
		this._onPointerDown = ::this._onPointerDown;
		this._onPointerMove = ::this._onPointerMove;
		this._onPointerUp = ::this._onPointerUp;
		this._onPointerCancel = ::this._onPointerCancel;
		this._onMouseWheelHandler = ::this._onMouseWheelHandler;
		// this._onDOMMouseScrollHandler = ::this._onDOMMouseScrollHandler;
	}


	_unbindMethods() {
		this._onPointerDown = null;
		this._onPointerMove = null;
		this._onPointerUp = null;
		this._onPointerCancel = null;
		this._onMouseWheelHandler = null;
		this._onDOMMouseScrollHandler = null;
	}


	_activate(){
		if (this._isMac) {
			this._interactiveElement.addEventListener('wheel', this._onMouseWheelHandler);
		} else {
			this._interactiveElement.addEventListener('DOMMouseScroll', this._onMouseWheelHandler);
			this._interactiveElement.addEventListener('mousewheel', this._onMouseWheelHandler);
		}

		this._interactiveElement.addEventListener('mousedown',  this._onPointerDown);
		this._interactiveElement.addEventListener('touchstart',  this._onPointerDown);
	}


	_deactivate(){

		this._interactiveElement.removeEventListener('wheel', this._onMouseWheelHandler);
		this._interactiveElement.removeEventListener('mousewheel', this._onMouseWheelHandler);
		this._interactiveElement.removeEventListener('mousewheel', this._onMouseWheelHandler);
		this._interactiveElement.removeEventListener('mousedown',  this._onPointerDown);
		this._interactiveElement.removeEventListener('touchstart',  this._onPointerDown);
	}


	_addPostActionEvents() {
		window.addEventListener('mousemove', this._onPointerMove);
		window.addEventListener('mouseup', this._onPointerUp);
		window.addEventListener('touchmove', this._onPointerMove);
		window.addEventListener('touchend', this._onPointerUp);
	}


	_removePostActionEvents() {
		window.removeEventListener('mousemove', this._onPointerMove);
		window.removeEventListener('mouseup', this._onPointerUp);
		window.removeEventListener('touchmove', this._onPointerMove);
		window.removeEventListener('touchend', this._onPointerUp);
	}










	_onPointerDown(event) {
		if (event.targetTouches && event.targetTouches.length !== 1) return false; 

		const x = (event.targetTouches) ? event.targetTouches[0].clientX: event.pageX;
		const y = (event.targetTouches) ? event.targetTouches[0].clientY: event.pageY;

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


	_onPointerMove(event) {
		if (event.targetTouches && event.targetTouches.length !== 1) return false; 

		const x = (event.targetTouches) ? event.targetTouches[0].clientX: event.pageX;
		const y = (event.targetTouches) ? event.targetTouches[0].clientY: event.pageY;

		if (this._pointerDown === true){
			this._deltaX = x - this._lastX;
			this._deltaY = y - this._lastY;

			if (this._delegate.dragMove !== undefined){
				this._delegate.dragMove(this._deltaX, this._deltaY, x, y);
			}

			this._lastX = x;
			this._lastY = y;
		}

		if (Math.abs(this._deltaX) < Math.abs(this._deltaY) && event.targetTouches)  {
			
			
		} else {
			// this stops scroll of the page on iOS, and dragging of image on chrome
			event.preventDefault();
		}

		return false;
	}


	_onPointerUp(event) {
		if (event.targetTouches && event.targetTouches.length > 0) return false; 

		const x = (event.targetTouches) ? this._lastX: event.pageX;
		const y = (event.targetTouches) ? this._lastY: event.pageY;

		//record the x and y so we can use the coords in single click, and dragEnd
		this._lastX = x;
		this._lastY = y;

		this._pointerDown = false;	

		this._removePostActionEvents();

		const confirmedClickOrTap = this._confirmClickOrTap(x, y);
		if (confirmedClickOrTap) {
			return false;
		}
		
		this._delegate.dragEnd(this._deltaX, this._deltaY, x, y);

		event.preventDefault();

		return false;
	}


	_onPointerCancel(event) {

	}


	_confirmClickOrTap(x, y) {
		const distanceMoved = Point.distance(new Point(x, y), new Point(this._originX, this._originY));			//check distance moved since mouse down
		
		const downTimeDuration = new Date().getTime() - this._downStartTime;									//check duration of mousedown and mouseup
		let timeElapsedSinceLastClick;
		
		if(this._click === true && distanceMoved < InputController.CLICK_THRESHOLD_DISTANCE && downTimeDuration < InputController.CLICK_THRESHOLD_DURATION) {

			this._clickStartArray.push(this._downStartTime);																//add time of start click to array
			timeElapsedSinceLastClick = this._downStartTime - this._clickStartArray[this._clickStartArray.length - 2];		//duration between this click and last, from mousedown of first click to mousedown of second click
			
			if(timeElapsedSinceLastClick < InputController.DOUBLE_CLICK_THRESHOLD_DURATION){								//if double click duration is below doubleClickThreshold then create double click
	
				this._onDoubleClick(x, y);
			}else{
				this._singleClickTimeout = setTimeout( () => {
					this._onSingleClick(x, y);
				}, InputController.DOUBLE_CLICK_THRESHOLD_DURATION); //use timeout on single click to allow for user to double click and overide single click action
			}

			return true;
		}

		return false;
	}


	_onSingleClick(x, y) {
		this._delegate.singleClick(this._lastX, this._lastY);
	}


	_onDoubleClick(x, y) {
		this._delegate.doubleClick(this._lastX, this._lastY);
	}


	// _onDOMMouseScrollHandler(event) {
	// 	if (event.originalEvent) event = event.originalEvent;

	// 	const delta = - event.detail * 3

	// 	this._setMouseWheenDelta(delta, 0, 0);

	// 	event.preventDefault();
	// }


	_onMouseWheelHandler(event) {

		let delta = -event.deltaY;

		// // const delta = event.wheelDelta || (-event.deltaY * 0.1);
		let deltaX = 0;
		let deltaY = 0;

		// if (event.wheelDeltaX || event.wheelDeltaY) {
		// 	deltaX = event.wheelDeltaX;
		// 	deltaY = event.wheelDeltaY;
		// }

		// delta = this._normalizeWheel(event).pixelY;
		delta = this._normalizeWheelSpeed(event);

		this._setMouseWheenDelta(delta);

		event.preventDefault();	//prevent lion browser from bounce scroll effect
	}




	_normalizeWheelSpeed(event) {
	    let normalized;
	    if (event.wheelDelta) {
	        normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 40 : event.wheelDelta / 4; // bringing us 3
	    } else {
	        const rawAmmount = event.deltaY ? event.deltaY : event.detail;
	        normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
	    }
	    // console.log(normalized);

	    return normalized;
	}




	_setMouseWheenDelta(delta) {
		this._delegate.setMouseWheelScrollDelta(delta);
	}







	//PUBLIC
	//________________________________________________________________________________________________________________________
	isPointerDown() {
		return this._pointerDown;
	}


	setDelegate(delegate) {
		this._delegate = delegate;
	}


	activate() {
		this._activate();
	}


	deactivate() {
		this._deactivate();
	}


	destroy() {
		this._destroy();
	}
}