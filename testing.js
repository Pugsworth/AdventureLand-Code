// <canvas id="canvas" width="500" height="500" style="border: 1px solid black;"></canvas>


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function draw_line(v1, v2) {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.moveTo(v1.x, v1.y);
  ctx.lineTo(v2.x, v2.y);
  ctx.stroke();
}

function draw_circle(v, radius, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(v.x, v.y, radius || 10, 0, 2 * Math.PI);
  ctx.stroke();
}

function draw_cross(v, size=10) {
  let unit = 0.7071067811865475; // magic size of 45deg angle
  let hsize = size/2;
  let v11 = new Vector(-unit*hsize+v.x, -unit*hsize+v.y);
  let v12 = new Vector(unit*hsize+v.x, unit*hsize+v.y);
  let v21 = new Vector(unit*hsize+v.x, -unit*hsize+v.y);
  let v22 = new Vector(-unit*hsize+v.x, unit*hsize+v.y);
  draw_line(v11, v12);
  draw_line(v21, v22);
}

let v = new Vector(200, 200);

// draw_line(Vector.ZERO, v);
let dia = 150;
draw_circle(v, dia);
draw_cross(v, dia);
let iter = 16;
let deg = -(360/iter);
for (let i = 0; i < iter; i++) {
  let r = Math.random() * Math.PI * 2;
  let color = "hsl("+deg*i+", 100%, 50%)";
  let nv = v.clone().add(0, dia).rotate(v, Math.PI/(iter/2) * i);
  draw_circle(nv, 10, color);
  let ang = Util.deg2rad(deg * i);
  
  let cp = nv.clone().add( Vector.fromAngle(ang).multiply(25) );
  draw_cross(cp);
  draw_line(cp, nv);
}