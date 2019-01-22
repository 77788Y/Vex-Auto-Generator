function mousePressed() {

  // try to select points
  if (selected_tool == null) for (let i = path_points.length - 1; i >= 0; i--) {
    if (pow(mouseX - path_points[i].x * field_size, 2) + pow(mouseY - path_points[i].y * field_size - 96, 2) <= 8 * 8) {
      selected = 'field_point';
      selected_index = i;
      return;
    }
  }

  // try to select shapes
  if (selected_tool == null) for (let i = path_moves.length - 1; i > 0; i--) {
    if ( i >= 1 && path_moves[i] != null && typeof path_moves[i] == 'object' && path_moves[i].hasOwnProperty('type')) {

      switch (path_moves[i].type) {

        case ('line'):
          let slope = (path_points[i].y - path_points[i-1].y) / (path_points[i].x - path_points[i-1].x);
          let first_point = (path_points[i].x < path_points[i-1].x) ? path_points[i] : path_points[i-1];
          let nearest_point = slope * (mouseX - field_size * first_point.x) + 96 + field_size * first_point.y;
          if (abs(nearest_point - mouseY) <= 4) {
            selected = 'field_line';
            selected_index = i;
            return;
          }
        break;

        // case ('arc'):
        //   let slope = (path_points[i].y - path_points[i-1].y) / (path_points[i].x - path_points[i-1].x);
        //   let nearest_point = slope * mouseX;
        //   if (fabs(nearest_point - mouseY) <= 4) {
        //     selected = 'field_line';
        //     selected_index = i;
        //     return;
        //   }
        // break;

        default: break;
      }
    }
  }

  // try to select shape tools
  if (mouseX > width - 304 && mouseX < width - 176 && mouseY > 176 && mouseY < 304) {
    selected_tool = 'line';
    return;
  }
  if (mouseX > width - 144 && mouseX < width - 16 && mouseY > 176 && mouseY < 304) {
    selected_tool = 'arc';
    return;
  }

  // try to place point
  if (['line', 'arc'].includes(selected_tool) &&
      mouseX > config.field_coords.start_x * img_scale &&
      mouseX < config.field_coords.start_x * img_scale + config.field_coords.width * img_scale &&
      mouseY > config.field_coords.start_y * img_scale + 96 &&
      mouseY < config.field_coords.start_y * img_scale + config.field_coords.height * img_scale + 96) {

    if (path_points.length > 0)  {

      let move = selected_tool == 'line' ? new Line() : (
        selected_tool == 'arc' ? new Arc() : null
      );

      if (keyIsDown(CONTROL) && move.type == 'arc') move.use_large = true;
      
      if (selected == 'field_point') path_moves.splice(selected_index + 1, 0, move);
      else path_moves.push(move);
    }

    if (selected == 'field_point') path_points.splice(selected_index + 1, 0, new Point(mouseX / field_size, (mouseY - 96) / field_size));
    else path_points.push(new Point(mouseX / field_size, (mouseY - 96) / field_size));

    selected_index++;
    if (selected == 'field_point' && selected_index >= path_points.length - 1) selected = null;
    return;
  }

  selected = null;
  return;

}