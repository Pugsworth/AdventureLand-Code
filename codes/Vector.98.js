class Vector {
    constructor(x, y) {
        if (!x) x = 1.0
        if (!y) y = x;
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

    length() {
        return Math.sqrt(x * x + y * y);
    }

    normalize() {
        return Math.hypot(x, y);
    }

    toAngles() {
        return -Math.atan2(-this.y, this.x);
    }
    angleTo(av) {
        return Math.acos(this.dot(av) / (this.length() * av.length()));
    }

    static fromAngle(a) {
        return new Vector(Math.cos(a), Math.sin(a));
    }

    fromAngle(a) {
        this.x = Math.cos(a);
        this.y = Math.sin(a);
        return this;
    }

    toObject() {
        return { x: this.x, y: this.y };
    }
}