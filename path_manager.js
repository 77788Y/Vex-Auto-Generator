var path_points = [];
var path_moves = [null];
var gp = new Point();

// draw all the moves of a path to the screen
function draw_path_moves(pts, mvs) {

  for (let i = 0; i < mvs.length; i++) {
    if ( i >= 1 && mvs[i] != null && typeof mvs[i] == 'object' && mvs[i].hasOwnProperty('type')) {
    
      // setup drawing mode
      if (pts[i-1].is_tentative || pts[i].is_tentative) stroke(0, 100);
      else stroke(0);
      strokeWeight((['field_line', 'field_arc'].includes(selected) && selected_index == i) ? 8 : 4);
      noFill();

      switch (mvs[i].type) {

        // draw line
        case "line":
          line(field_size * pts[i-1].x, field_size * pts[i-1].y, field_size * pts[i].x, field_size * pts[i].y);
          pts[i].angle = atan2(-(pts[i].y - pts[i-1].y), pts[i].x - pts[i-1].x);
        break;

        // draw arc
        case "arc":
          let p = rotate_around_point(pts[i], pts[i-1], -pts[i-1].angle);
          let inner_angle = 90 - abs(atan2(p.y, p.x));
          let dist_between_points = sqrt(p.x*p.x + p.y*p.y);
          let radius = abs((dist_between_points/2)/cos(inner_angle)) * -sign(p.y);

          let global_center_x = pts[i-1].x + (radius * cos(pts[i-1].angle - 90));
          let global_center_y = pts[i-1].y - (radius * sin(pts[i-1].angle - 90));

          let angle_start = pts[i-1].angle + 90;
          let angle_diff = abs(atan2(p.y, p.x)) * 2;
          if (angle_diff > 180) angle_diff = 360 - angle_diff;
          if (mvs[i].use_large) angle_diff = -(360 - angle_diff);
          angle_diff *= sign(p.y) * sign(p.x);

          beginShape();
          for (var a = angle_start; (angle_diff > 0) ? (a <= angle_start + angle_diff) : (a >= angle_start + angle_diff); (angle_diff > 0) ? a++ : a--) {

            let c_x = radius * cos(a);
            let c_y = radius * sin(a);
            vertex(field_size * (global_center_x + c_x), field_size * (global_center_y - c_y));

          }
          endShape();

          // adjust angle of end point
          pts[i].angle = angle_start + angle_diff - 90;

          if (i < path_moves.length) {
            path_moves[i].angle_start = angle_start;
            path_moves[i].angle_diff = angle_diff;
            path_moves[i].center_x = global_center_x;
            path_moves[i].center_y = global_center_y;
            path_moves[i].radius = radius;
          }

        break;

        default: break;
      }
    }
  }
}

// draw all the points of a path to the screen
function draw_path_points(pts) {

  for (var i = 0; i < pts.length; i++) {

    if (pts[i].is_tentative) stroke(0, 100);
    else stroke(0);

    if (selected == 'field_point' && selected_index == i) strokeWeight(22);
    else strokeWeight(10);

    point(field_size * pts[i].x, field_size * pts[i].y);

    if (pts[i].is_tentative) stroke(255, 100);
    else stroke(255);

    if (selected == 'field_point' && selected_index == i) strokeWeight(12);
    else strokeWeight(6);

    point(field_size * pts[i].x, field_size * pts[i].y);
  }

}