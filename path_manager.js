var path_points = [];
var path_moves = [];

// draw all the moves of a path to the screen
function draw_path_moves() {

  // setup drawing mode
  stroke(0);
  strokeWeight(10);
  noFill();

  for (let i = 0; i < path_moves.length; i++) {
    switch (path_moves[i]) {

      // draw line
      case movement.LINE:
        line(path_points[i-1].x, path_points[i-1].y, path_points[i].x, path_points[i].y);
        path_points[i].angle = atan2(path_points[i].y - path_points[i-1].y, path_points[i].x - path_points[i-1].x);
      break;

      // draw arc
      case movement.ARC:
        let p = rotate_around_point(path_points[i], path_points[i-1], -path_points[i-1].angle);
        let inner_angle = 90 - abs(atan2(p.y, p.x));
        let dist_between_points = sqrt(p.x*p.x + p.y*p.y);
        let radius = abs((dist_between_points/2)/cos(inner_angle)) * sign(p.y);

        let global_center_x = path_points[i-1].x + (radius * cos(path_points[i-1].angle - 90));
        let global_center_y = path_points[i-1].y - (radius * sin(path_points[i-1].angle - 90));

        point(global_center_x, global_center_y);

        let angle_start = path_points[i-1].angle + 90;
        let angle_diff = abs(atan2(p.y, p.x)) * 2;
        if (angle_diff > 180) angle_diff = 360 - angle_diff;
        angle_diff *= -sign(p.y) * sign(p.x);

        beginShape();
        for (var a = angle_start; (angle_diff > 0) ? (a <= angle_start + angle_diff) : (a >= angle_start + angle_diff); (angle_diff > 0) ? a++ : a--) {

          let c_x = radius * cos(a);
          let c_y = radius * sin(a);
          vertex(global_center_x + c_x, global_center_y - c_y);

        }
        endShape();

        // adjust angle of end point
        path_points[i].angle = angle_start + angle_diff - 90;

      break;

      default: break;
    }
  }
}

// draw all the points of a path to the screen
function draw_path_points() {



}