let next_point = new Point();

function run_path_manager() {
  
  next_point = new Point(mouseX / field_size, (mouseY - 96) / field_size);
  next_point.is_tentative = true;

  let pts = copy_array(path_points);
  let mvs = copy_array(path_moves);

  if (selected == 'field_point') pts.splice(selected_index + 1, 0, next_point);
  else pts.push(next_point);

  if (path_points.length > 0) {

    let move = selected_tool == 'line' ? new Line() : (
      selected_tool == 'arc' ? new Arc() : null
    );

    if (keyIsDown(CONTROL) && move.type == 'arc') move.use_large = true;

    if (selected == 'field_point')  mvs.splice(selected_index + 1, 0, move);
    else mvs.push(move);
  }
  
  draw_path_moves(pts, mvs);
  draw_path_points(pts);
}

function mouseDragged() {

  if (selected == 'field_point') {
    path_points[selected_index].x = mouseX / field_size;
    path_points[selected_index].y = (mouseY - 96) / field_size;
  }

}