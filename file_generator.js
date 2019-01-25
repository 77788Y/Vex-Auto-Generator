let program_name = "autonomous program";

let program_file = null;
function generate_file_blob() {
  let file_text = "";

  // get program and function names
  let input_name = window.prompt("What should we call your program?", program_name);

  if (input_name != null) {
    program_name = input_name;
    let function_name = program_name.replace(' ', '_').replace('-', '_').replace(/[^a-zA-Z0-9]/g, '');
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(function_name.charAt(0))) function_name = '_' + function_name;

    // includes
    for (let i = 0; i < config.includes.length; i++) {
        file_text += "#include \"" + config.includes[i] + '\"\n';
    }
    file_text += '\n\n';

    // setup function header
    file_text += 'void ' + function_name + '() {\n';

    // calculate field scalar
    let scalar = 144 / (config.field_coords.width / field_img.width);

    // generate program
    for (let i = 1; i < path_moves.length; i++) {
      switch (path_moves[i].type) {

        case 'line':

          // rotate if necessary
          let line_angle = path_points[i].angle;
          let angle_diff_coterminal = line_angle - path_points[i-1].angle;
          while (abs(angle_diff_coterminal) > 180) angle_diff_coterminal -= 360 * sign(angle_diff_coterminal); 
          let angle_diff = angle_diff_coterminal;
          if (path_points[i-1].angle != line_angle) file_text += '\t' + config.function_rotate.replace('%a', angle_diff) + ';\n';

          // move length of line
          let dist = sqrt(pow((path_points[i].x - path_points[i-1].x) * scalar, 2) + pow((path_points[i].y - path_points[i-1].y) * scalar, 2));
          file_text += '\t' + config.function_move_dist.replace('%l', dist).replace('%r', dist).replace('%s', path_points[i].brake) + ';\n';
        break;

        case 'arc':
          
          // move along arc
          file_text += '\t' + config.function_move_arc.replace('%r', path_moves[i].radius * scalar).replace('%a', path_moves[i].angle_diff).replace('%s', path_points[i].brake) + ';\n';
        break;
      }
    }

    // end function
    file_text += '}\n';

    // generate blob
    let data = new Blob([file_text], {type: 'text/plain'});
    if (program_file != null) window.URL.revokeObjectURL(program_file);
    program_file = window.URL.createObjectURL(data);

    let generate_btn = document.getElementById("btn_generate");
    generate_btn.href = program_file;
    generate_btn.setAttribute('download', program_name + '.cpp');
    generate_btn.click();
  }
}