// rotate point around another point
function rotate_around_point(point_to_rotate, point_around, angle) {

    let p0 = point_around;
    let p1 = point_to_rotate;

    let dist = sqrt((p1.x-p0.x)*(p1.x-p0.x) + (p1.y-p0.y)*(p1.y-p0.y))
    let angle_orig = atan2(p1.y-p0.y, p1.x-p0.x);
    let angle_new = angle_orig + angle;

    return new Point(
      dist * cos(angle_new),
      dist * sin(angle_new)
    );
}

function sign(a) {
  if (a > 0) return 1;
  if (a < 0) return -1;
  return 0;
}