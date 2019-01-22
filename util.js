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

function copy_array(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? copy_array(v) : v;
  }
  return output;
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

function point_in_arc(point, center, radius, angle_start, angle_diff) {

  let angle = -atan2(point.y - center.y, point.x - center.x);

  for (var a = angle_start; (angle_diff > 0) ? (a <= angle_start + angle_diff) : (a >= angle_start + angle_diff); (angle_diff > 0) ? a++ : a--) {

    let c_x = radius * cos(a);
    let global_x = field_size * (center.x + c_x);
    let c_y = radius * sin(a);
    let global_y = field_size * (center.y - c_y) + 96;

    let dist_squared = pow(mouseX - global_x, 2) + pow(mouseY - global_y, 2);
    if (abs(dist_squared) <= 16) return true;
  }

  return false;
}

function mouse_in_field() {
  return mouseX > config.field_coords.start_x * img_scale &&
         mouseX < config.field_coords.start_x * img_scale + config.field_coords.width * img_scale &&
         mouseY > config.field_coords.start_y * img_scale + 96 &&
         mouseY < config.field_coords.start_y * img_scale + config.field_coords.height * img_scale + 96;
}

function xor(a, b) {
  return (a || b) && !(a && b);
}