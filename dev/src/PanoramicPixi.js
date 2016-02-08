
import RangeMaster from "../../dist/range-master";

import PIXI from "pixi.js"; 

export default class PanoramicPixi {

	constructor() {

		this._pixiContainer = null;

		this._stage = null;

		this._container = null;

		this._sprites = [];

		this._renderer = null;

		this._init();
	}


	_init() {

		this._render = ::this._render;

		this._pixiContainer = document.getElementsByClassName('panoramic-pixi')[0];

		this._stage = new PIXI.Stage(0xFF0000);
 
		this._renderer = PIXI.autoDetectRenderer(400, 300);

		this._pixiContainer.appendChild(this._renderer.view);

		
		this._build();
		
		this._render();


		const options = {
			length: 2800,
			cellLength: 400,
			wrap: true,
			inertia: true,
			rounded: false,
			snap: true,
			target: this._pixiContainer,
			contain: false,
			mouseDeltaToRangeUnitRatio: () => 1
		}

		const rangeMaster = new RangeMaster(options);
		rangeMaster.on(RangeMaster.EVENT_UPDATE, ::this._onRangeMasterUpdate);
	}


	_build() {
		this._container = new PIXI.Container();

		this._stage.addChild(this._container);

		const imagePaths = [
			"./img/pixi/c130.jpg",
			// "./img/pixi/ch47.jpg",
			// "./img/pixi/cn235.jpg",
			// "./img/pixi/f15.jpg",
			// "./img/pixi/f16.jpg",
			// "./img/pixi/uh1.jpg",
			// "./img/pixi/uh60.jpg"
		];

		imagePaths.forEach((filePath, index) => {
			const texture = PIXI.Texture.fromImage(filePath);

			const sprite = new PIXI.Sprite(texture);

			sprite.x = 400 * index;
			sprite.width = 400;
			sprite.height = 300;

			this._sprites.push(sprite);

			this._container.addChild(sprite);
		});

	}

	_render() {

		this._renderer.render(this._stage);

		window.requestAnimationFrame(this._render);
	}

	_onRangeMasterUpdate(x) {
		x *= -1;
		this._container.x = x;

		if (x < -2400) {
			this._sprites[0].x = 2800;
		} else {
			this._sprites[0].x = 0;
		}
	}

			
}