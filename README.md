# Range Master

Range Master was created to handle the repetitive task of managing a range of values in UI components like carousels and 360 viewers. I found abstracting this out enables me to throw together complex bespoke interactive components much quicker.

Range Master builds on top of Range Dog which purely handles a range and the current position within that range. Range Master connects this range to user events such as touch and mouse, and also provide some animation functionality to move within the range.

With this taken care of creating a carousel can now acheived in a few lines of code.

## Simple Carousel Example

```javascript
import RangeMaster from 'range-master';

const options = {
	length: 500,
	wrap: false,
	inertia: true,
	rounded: false,
	snap: false,
	target: document.querySelector('.carousel__frame'),
	contain: true,
}

const rangeMaster = new RangeMaster(options);
rangeMaster.on(RangeMaster.EVENT_UPDATE, updateDom);

const carouselContainer = document.querySelector('.carousel__container')

updateDom(x) {
	x *= -1;
	carouselContainer.style.transform = `translate3d(${x}%, 0, 0)`
}

```

In the example above Range Master is set to manage a range between 0 and 500. UI input is taken from the target property. Updates are then called using the EVENT_UPDATE event. Here we invert x to produce values from -500 to 0, and then translate a dom container element.

Range Master amied to be as flexible as possible for any interactive implementation, and so only uses a html target element to attach input events to, and uses [Motion Tween](https://github.com/johnhornsby/motion-tween) which uses RAF to create its updates.
