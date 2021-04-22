class Vector {
    static ZERO  = new Vector(0.0, 0.0);
    static ONE   = new Vector(1.0, 1.0);
    static UP    = new Vector(0.0, -1.0);
    static RIGHT = new Vector(1.0, 0.0);
    static DOWN  = new Vector(0.0, 1.0);
    static LEFT  = new Vector(-1.0, 0.0);

    constructor(x, y) {
        if (x == null) { x = 0.0; }
        if (y == null) { y = x; }
        this.x = x;
        this.y = y;
    }

    add(a, b) {
        if (a instanceof Vector) {
            this.x += a.x;
            this.y += a.y;
        } else if (Util.isNumber(a) && Util.isNumber(b)) {
            this.x += a;
            this.y += b;
        } else if (Util.isNumber(a)) {
            this.x += a;
            this.y += a;
        }

        return this;
    }

    subtract(a, b) {
        if (a instanceof Vector) {
            this.x -= a.x;
            this.y -= a.y;
        } else if (Util.isNumber(a) && Util.isNumber(b)) {
            this.x -= a;
            this.y -= b;
        } else if (Util.isNumber(a)) {
            this.x -= a;
            this.y -= a;
        }

        return this;
    }
    multiply(a, b) {
        if (a instanceof Vector) {
            this.x *= a.x;
            this.y *= a.y;
        } else if (Util.isNumber(a) && Util.isNumber(b)) {
            this.x *= a;
            this.y *= b;
        } else if (Util.isNumber(a)) {
            this.x *= a;
            this.y *= a;
        }

        return this;
    }
    divide(a, b) {
        if (a instanceof Vector) {
            this.x /= a.x;
            this.y /= a.y;
        } else if (Util.isNumber(a) && Util.isNumber(b)) {
            this.x /= a;
            this.y /= b;
        } else if (Util.isNumber(a)) {
            this.x /= a;
            this.y /= a;
        }

        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x
    }

    normalize() {
        return this.divide(this.length());
    }

    static length(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toAngle() {
        return -Math.atan2(-this.y, this.x);
    }
    
    angleTo(av) {
        return Math.acos(this.dot(av) / (this.length() * av.length()));
    }

    static fromAngle(a) {
        return new Vector(Math.cos(a), Math.sin(a));
    }

    static fromObject(obj) {
        if (obj != null && "x" in obj && "y" in obj) {
    		return new Vector(obj.x, obj.y);
    	}
    	return Vector.ZERO.clone();
    }

    static fromAngle(a) {
        return new Vector().fromAngle(a);
    }

    fromAngle(a) {
        this.x = Math.cos(a);
        this.y = Math.sin(a);
        return this;
    }

    toObject() {
        return { x: this.x, y: this.y };
    }

    clone() {
    	return new Vector(this.x, this.y);
    }

    static lerpTo(v1, v2, percent) {
    	if (percent > 1) percent = 1;
    	let x = v1.x + (v2.x - v1.x) * percent;
    	let y = v1.y + (v2.y - v1.y) * percent;
    	return new Vector(x, y);
    }

    lerp(to, percent) {
    	if (percent > 1) percent = 1;
    	let x = this.x + (to.x - this.x) * percent;
    	let y = this.y + (to.y - this.y) * percent;
    	this.x = x;
    	this.y = y;
    	return this;
    }

    rotate(origin, angle) {
      // x' = x cos(θ) - y sin(θ)
      // y' = x sin(θ) + y cos(θ)
        let length = Vector.length(origin.x-this.x, origin.y-this.y);
        this.x = origin.x + Math.cos(angle) * length;
        this.y = origin.y + Math.sin(angle) * length;
        return this;
    }

    rotateBy(origin, angle) {
      let len = this.subtract(origin).length();
      let cang = this.toAngle();
      let nang = cang + angle;
           
      this.x = len * Math.cos(nang) + origin.x;
      this.y = len * Math.sin(nang) + origin.y;
      
      return this;
    }

    static lengthSqr(x, y) {
        return x*x+y*y;
    }

    lengthSqr() {
    	return this.x*this.x + this.y*this.y;
    }

    static distance(x1, y1, x2, y2) {
        return Math.hypot(x2-x1, y2-y1);
    }

    distance(v2) {
        return Math.hypot(v2.x-this.x, v2.y-this.y);
    	// return v2.clone().subtract(this).length();
    }

    static distanceSqr(x1, y1, x2, y2) {
        return (x2-x1)^2 + (y2-y1)^2;
    }

    distanceSqr(v2) {
        return (v2.x-this.x)^2 + (v2.y+this.y)^2;
    	// return v2.subtract(this).lengthSqr();
    }
}
