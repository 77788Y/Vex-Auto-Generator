function mouseClicked() {

  // try to select points
  for (let i = 0; i < path_points.length; i++) {
    if (pow(mouseX - path_points[i].x * field_size, 2) + pow(mouseY - path_points[i].y * field_size - 96, 2) <= 22 * 22) {
      selected = 'field_point';
      selected_index = i;
      return;
    }
  }

  // try to select shape tools
  if (mouseX > width - 304 && mouseX < width - 176 && mouseY > 176 && mouseY < 304) {
    selected_tool = 'line';
    selected = 'line';
    return;
  }
  if (mouseX > width - 144 && mouseX < width - 16 && mouseY > 176 && mouseY < 304) {
    selected_tool = 'arc';
    selected = 'arc';
    return;
  }

  // try to place point
  if (mouseX > config.field_coords.start_x * img_scale &&
      mouseX < config.field_coords.start_x * img_scale + config.field_coords.width * img_scale &&
      mouseY > config.field_coords.start_y * img_scale + 96 &&
      mouseY < config.field_coords.start_y * img_scale + config.field_coords.height * img_scale + 96) {

    if (path_points.length > 0)  {
      
      if (selected == 'field_point') path_moves.splice(selected_index + 1, 0, (
        selected_tool == 'line' ? new Line() : (
        selected_tool == 'arc' ? new Arc() : null
      )));
      else path_moves.push(
        selected_tool == 'line' ? new Line() : (
        selected_tool == 'arc' ? new Arc() : null
      ));
    }

    if (selected == 'field_point') path_points.splice(selected_index + 1, 0, new Point(mouseX / field_size, (mouseY - 96) / field_size));
    else path_points.push(new Point(mouseX / field_size, (mouseY - 96) / field_size));
    return;
  }

  selected = null;
  return;

}