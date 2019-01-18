// rotate point around another point
function rotate_around_point(point_to_rotate, point_around, angle) {

  let delta_x = point_to_rotate.x - point_around.x;
  let delta_y = point_to_rotate.y - point_around.y;

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