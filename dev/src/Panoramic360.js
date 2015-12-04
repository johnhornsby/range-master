
import RangeMaster from "../../dist/range-master";

export default class Panoramic360 {

	constructor() {

		this._range360 = null;

		this._360Image = document.getElementsByClassName('panoramic-360__image')[0];

		this._360Target = document.getElementsByClassName('panoramic-360')[0];

		this._preloadedImages = 0;

		this._init();
	}


	_init() {
		const options360 = {
			length: 180,
			cellLength: 1,
			wrap: true,
			inertia: true,
			rounded: true,
			snap: false,
			target: this._360Target,
			mouseDeltaToRangeUnitRatio: ::this._360ratio
			
		}

		const rangeMaster360 = new RangeMaster(options360); 
		rangeMaster360.on(RangeMaster.EVENT_UPDATE, ::this._onRangeMaster360Update);

		this._preloadImages();
	}


	_360ratio() {
		return 180 / this._360Target.clientWidth;
	}

	_onRangeMaster360Update(x) {
		x = 180 - x;
		const url = `img/1024x768-6/${this._pad(x, 5)}.jpg`
		this._360Image.src = url;
	}


	_pad(float, length) {
		const int = Math.floor(float);
		let str = String(int);
		while (str.length !== length) {
			str = "0" + str
		}
		return str
	}

	_preloadImages() {
		let url;
		for(var i = 1; i <= 180; i++) {
			url = `img/1024x768-6/${this._pad(i, 5)}.jpg`
			this._preloadImage(url);
		}
	}

	_preloadImage(src) {
		const image = new Image();
		image.src = src;
		image.onload = () => {
			this._preloadedImages += 1
			if (this._preloadedImages == 180) {
				this._preloadImagesComplete();
			}
		};
	}

	_preloadImagesComplete() {
		this._360Target.style.display = 'block';
	}
			
}