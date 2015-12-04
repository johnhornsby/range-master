
import RangeMaster from "../../dist/range-master";


export default class Carousel {

	constructor() {
		this._content = null;

		this._frame = null;

		this._init();
	}


	_init() {
		this._content = document.getElementsByClassName('carousel__content')[0];

		this._frame = document.getElementsByClassName('carousel__frame')[0];

		const options = {
			length: 600,
			cellLength: 100,
			wrap: true,
			inertia: true,
			rounded: false,
			snap: false,
			target: this._frame,
			contain: false,
			mouseDeltaToRangeUnitRatio: () => 100 / window.innerWidth
		}

		const rangeMaster = new RangeMaster(options);
		rangeMaster.on(RangeMaster.EVENT_UPDATE, ::this._onRangeMasterUpdate);

		const nextButton = document.getElementsByClassName('carousel__next')[0];
		const prevButton = document.getElementsByClassName('carousel__previous')[0];

		nextButton.addEventListener('click', ::rangeMaster.slideToNextCell);
		prevButton.addEventListener('click', ::rangeMaster.slideToPreviousCell);
	}


	_onRangeMasterUpdate(x) {
		x *= -1;
		this._content.style.transform = `translate3d(${x}%, 0, 0)`;

		if (x < -500) {
			this._content.children[0].style.left = '600vw';
		} else {
			this._content.children[0].style.left = '0vw';
		}
	}
}