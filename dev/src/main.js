import Carousel from './Carousel';
import Panoramic360 from './Panoramic360';

class Main {

	constructor() {

		this._init();
	}


	_init() {
		new Carousel();

		new Panoramic360();
	}
}

new Main();