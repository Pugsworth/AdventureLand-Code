// <canvas id="canvas" width="500" height="500" style="border: 1px solid black;"></canvas>


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let fps = 60;
let deltatime = 1/fps;

function draw_line(v1, v2, color="blue") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(v1.x, v1.y);
  ctx.lineTo(v2.x, v2.y);
  ctx.stroke();
}

function draw_circle(v, radius=10, color="blue") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(v.x, v.y, radius || 10, 0, 2 * Math.PI);
  ctx.stroke();
}

function draw_cross(v, size=10, color="blue") {
  let unit = 0.7071067811865475; // magic size of 45deg angle
  let hsize = size/2.0;
  let v11 = new Vector(-unit*hsize+v.x, -unit*hsize+v.y);
  let v12 = new Vector(unit*hsize+v.x, unit*hsize+v.y);
  let v21 = new Vector(unit*hsize+v.x, -unit*hsize+v.y);
  let v22 = new Vector(-unit*hsize+v.x, unit*hsize+v.y);
  draw_line(v11, v12, color);
  draw_line(v21, v22, color);
}

function draw_square(v, size=10, color="blue") {
  draw_rect(v, size, size, color);
}
function draw_rect(v, w, h, color="blue") {
  let hw = w/2.0;
  let hh = h/2.0;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.rect(v.x-hw, v.y-hh, w, h);
  ctx.stroke();
}
function draw_path(points, connect=false, color="blue") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    let p = points[i];
    ctx.lineTo(p.x, p.y);
  }
  if (connect) { ctx.closePath(); }
  ctx.stroke();
}
function draw_text(v, text, size, alignh="center", alignv="middle", font="serif", color="blue") {
  ctx.font = size+"px "+font;
  ctx.textAlign = alignh;
  ctx.textBaseline = alignv;
  ctx.fillText(text, v.x, v.y);
}

let v = new Vector(200, 200);
let time = 0.0;
let points = [];
let firstPoint;
let prevPoint;

function draw()
{
  // draw_line(Vector.ZERO, v);
  let dia = 150;
  // draw_circle(v, dia);
  draw_cross(v, dia);
  
  let iter = 16;
  let deg = -(360/iter);
  
  
  for (let i = 0; i < iter; i++) {
    let r = Math.random() * Math.PI * 2;
    let color = "hsl("+deg*i+", 100%, 50%)";
    let nv = v.clone().add(0, dia).rotate(v, Math.PI/(iter/2) * i);
    let ang = time + Util.deg2rad(deg * i);
    
    let cp = nv.clone().add( Vector.fromAngle(ang).multiply(25) );
    points[i] = cp;
    
    draw_circle(nv, 10, color);
    
    // draw_cross(cp);
    draw_line(nv, cp);
    draw_rect(cp, 20, 24);
    draw_text(cp, i, 20, "center", "middle");

  }
  
  draw_path(points, true, "red");
}

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += deltatime;
  
  draw();
}, deltatime*1000);
