var Util = {
	Drawing: {
		drawLine: (x, y, x2, y2, size, color, timeoutms=1000) => {
			let line = draw_line(x, y, x2, y2, size, color);
			setTimeout(line.destroy.bind(line), timeoutms);
		},
		drawCircle: (x, y, radius, size, color, timeoutms=1000) => {
			let circle = draw_circle(x, y, radius, size, color);
			setTimeout(circle.destroy.bind(circle), timeoutms);
		},
		drawCross: (x, y, radius, size, color, timeoutms=1000) => {
			let unit = 0.7071067811865475; // magic size of 45deg angle: Math.sqrt(2) / 2; = vector(1, 1).normalize() = vector(0.707, 0.707)
			let hsize = size/2;
			let v11 = new Vector(-unit*hsize+v.x, -unit*hsize+v.y);
			let v12 = new Vector(unit*hsize+v.x, unit*hsize+v.y);
			let v21 = new Vector(unit*hsize+v.x, -unit*hsize+v.y);
			let v22 = new Vector(-unit*hsize+v.x, unit*hsize+v.y);
			let line1 = draw_line(v11, v12);
			let line2 = draw_line(v21, v22);
			setTimeout(()=>{ line1.destroy(); line2.destroy(); }, timeoutms);
		}
	},
	rad2deg: (rad) => {
		return rad * (180 / Math.PI);
	},
	deg2rad: (deg) => {
		deg * (Math.PI / 180);
	},
	randomPointOnCircle: (x, y, radius) => {
		if (!x) x = character.x;
		if (!y) y = character.y;
		let rang = Math.random() * (Math.PI * 2);
		let dir = Util.angToVec(rang);
		return new Vector(x + dir.x * radius, y + dir.y * radius);
	},
	moveToRange: (range, targetx, targety) => {
		let ang = Util.angleTo(character.x, character.y, targetx, targety);
		let dir = Util.angToVec(ang);

		move(character.x + dir.x * range, character.y + dir.y * range);
	},
	isNumber: (a) => {
		return a != null && typeof(a) == "number";
	}
}


let Colors = {
	default: 0x00F33E,
	white: 0xFFFFFF,
	black: 0x000000,

	darkPurple: 0x46425e,
	darkCyan: 0x15788c,
	blue: 0x00b9be,
	tan: 0xffeecc,
	peach: 0xffb0a3,
	red: 0xff6973,

	Debug: {
		navyGrey: 0x344A5F,
		blue: 0x2A94D6,
		slate: 0xF0F1F2,
		lightBlue: 0x4EB1CB,
		red: 0xCF5C60,
		purple: 0x717ECD,
		green: 0x4AB471,
		orange: 0xF3AE4E,
		pink: 0xD96383
	}
};