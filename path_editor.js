let next_point = new Point();
let draw_tentative = true;

function run_path_manager() {

  let pts = copy_array(path_points);
  let mvs = copy_array(path_moves);
  
  if (mouse_in_field() && draw_tentative && ['line', 'arc'].includes(selected_tool)) {
    next_point = new Point(mouseX / field_size, (mouseY - 96) / field_size);
    next_point.is_tentative = true;

    if (selected == 'field_point') pts.splice(selected_index + 1, 0, next_point);
    else pts.push(next_point);

    if (path_points.length > 0) {

      let move = selected_tool == 'line' ? new Line() : (
        selected_tool == 'arc' ? new Arc() : null
      );

      if (xor(reverse_current_arc, selected != 'field_arc' && keyIsDown(CONTROL)) && move.type == 'arc') move.use_large = true;

      if (selected == 'field_point')  mvs.splice(selected_index + 1, 0, move);
      else mvs.push(move);
    }
  }
  
  draw_path_moves(pts, mvs);
  draw_path_points(pts);
}

function mouseDragged() {

  if (selected == 'field_point') {
    draw_tentative = false;
    path_points[selected_index].x = mouseX / field_size;
    path_points[selected_index].y = (mouseY - 96) / field_size;
  }
}

function mouseReleased() {
  draw_tentative = true;
}