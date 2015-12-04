export default class Point {

	constructor(x, y) {
		this.x = x;
		this.y = y;	
	}


	static distance = function(p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}


	toString(){
		return "Point x:" + this.x+" y:"+this.y;	
	}
}