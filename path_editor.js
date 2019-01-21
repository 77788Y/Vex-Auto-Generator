let next_point = new Point();

function run_path_manager() {
  
  next_point = new Point(mouseX / field_size, (mouseY - 96) / field_size);
  next_point.is_tentative = true;

  let pts = copy_array(path_points);
  let mvs = copy_array(path_moves);

  if (selected == 'field_point') pts.splice(selected_index + 1, 0, next_point);
  else pts.push(next_point);

  if (path_points.length > 0) {

    if (selected == 'field_point')  mvs.splice(selected_index + 1, 0, (
      selected_tool == 'line' ? new Line() : (
      selected_tool == 'arc' ? new Arc() : null
    )));
    else mvs.push(
      selected_tool == 'line' ? new Line() : (
      selected_tool == 'arc' ? new Arc() : null
    ));
  }
  
  draw_path_moves(pts, mvs);
  draw_path_points(pts);

}