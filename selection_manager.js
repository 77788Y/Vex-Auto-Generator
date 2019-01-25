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
          let mouse = rotate_around_point(new Point(mouseX, mouseY), new Point(path_points[i-1].x * field_size, path_points[i-1].y * field_size + 96), atan2(path_points[i].y - path_points[i-1].y, path_points[i].x - path_points[i-1].x));
          let end = rotate_around_point(new Point(path_points[i].x * field_size, path_points[i].y * field_size + 96), new Point(path_points[i-1].x * field_size, path_points[i-1].y * field_size + 96), atan2(path_points[i].y - path_points[i-1].y, path_points[i].x - path_points[i-1].x));
          if (abs(mouse.y) <= 4 && mouse.x > 0 == mouse.x < end.x) {
            selected = 'field_line';
            selected_index = i;
            return;
          }
        break;

        case ('arc'):
          let angle = atan2(mouseY - path_moves[i].center_y * field_size - 96, mouseX - path_moves[i].center_x * field_size);
          let dist_squared = pow(mouseY - path_moves[i].center_y * field_size - 96, 2) + pow(mouseX - path_moves[i].center_x * field_size, 2);

          if (point_in_arc(
              new Point(mouseX, mouseY),
              new Point(path_moves[i].center_x,
                path_moves[i].center_y), path_moves[i].radius,
                path_moves[i].angle_start,
                path_moves[i].angle_diff)) {
            selected = 'field_arc';
            selected_index = i;
            reverse_current_arc = path_moves[i].use_large;
            return;
          }
        break;

        default: break;
      }
    }
  }

  // try to select shape tools
  if (mouseX > width - 304 && mouseX < width - 176 && mouseY > 176 && mouseY < 304) {
    if (selected == 'field_arc') {
      selected = 'field_line';
      path_moves[selected_index] = new Line();
      save_to_file(JSON.stringify(save_path()))
    }

    else selected_tool = 'line';
    return;
  }
  if (mouseX > width - 144 && mouseX < width - 16 && mouseY > 176 && mouseY < 304) {
    if (selected == 'field_line') {
      selected = 'field_arc';
      path_moves[selected_index] = new Arc();
      save_to_file(JSON.stringify(save_path()));
    }

    else selected_tool = 'arc';
    return;
  }

  // try to toggle arc side
  if (mouseX > width - 280 && mouseX < width - 248 && mouseY > height - 84 && mouseY < height - 32 && (selected_tool == 'arc' || selected == 'field_arc')) {
    reverse_current_arc = !reverse_current_arc;
    if (selected == 'field_arc') {
      path_moves[selected_index].use_large = reverse_current_arc;
      save_to_file(JSON.stringify(save_path()));
    }
    return;
  }

  // try to toggle brake at point
  if (mouseX > width - 280 && mouseX < width - 248 && mouseY > height - 84 && mouseY < height - 32 && (selected_tool == null && selected == 'field_point')) {
    path_points[selected_index].brake = !path_points[selected_index].brake;
    save_to_file(JSON.stringify(save_path()));
    return;
  }

  // try to place point
  if (['line', 'arc'].includes(selected_tool) && mouse_in_field()) {

    if (path_points.length > 0)  {

      let move = selected_tool == 'line' ? new Line() : (
        selected_tool == 'arc' ? new Arc() : null
      );

      if (xor(reverse_current_arc, selected != 'field_arc' && keyIsDown(CONTROL)) && move.type == 'arc') move.use_large = true;
      
      if (selected == 'field_point') path_moves.splice(selected_index + 1, 0, move);
      else path_moves.push(move);
    }

    if (selected == 'field_point') path_points.splice(selected_index + 1, 0, new Point(mouseX / field_size, (mouseY - 96) / field_size));
    else path_points.push(new Point(mouseX / field_size, (mouseY - 96) / field_size));

    selected_index++;
    if (selected == 'field_point' && selected_index >= path_points.length - 1) selected = null;
    
    save_to_file(JSON.stringify(save_path()));
    return;
  }

  if (mouse_in_field()) selected = null;
  return;
}

function keyPressed() {

  if (keyCode == DELETE && selected == 'field_point') {
    path_points.splice(selected_index, 1);
    path_moves.splice(selected_index, 1);
    selected_index--;
    if (selected_index < 0) selected_index = 0;
  }
}