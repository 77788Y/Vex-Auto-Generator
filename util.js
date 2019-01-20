// rotate point around another point
function rotate_around_point(point_to_rotate, point_around, angle) {

  let delta_x = point_to_rotate.x - point_around.x;
  let delta_y = -(point_to_rotate.y - point_around.y);

    return new Point(
      (delta_x * cos(angle)) - (delta_y * sin(angle)),
      (delta_x * sin(angle)) + (delta_y * cos(angle))
    );
}

function sign(a) {
  if (a > 0) return 1;
  if (a < 0) return -1;
  return 0;
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  strokeWeight(1);
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y+h);
    }
  }
}