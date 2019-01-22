let selected_tool = 'line';
let reverse_current_arc = false;

function draw_menu() {
  push();

  // draw shadow
  translate(width - 352, 96);
  setGradient(0 , 0, 32, height-96, color_transparent, color_translucent_black, 'X');
  translate(32, 0);

  // shape header
  noStroke();
  fill(169, 255);
  strokeWeight(1);
  text('Add Shape', 16, 48);
  stroke(169);
  strokeWeight(1);
  noFill();
  line(16, 64, 304, 64);

  // line
  strokeWeight(1);
  stroke(169);
  if (selected_tool == 'line' || selected == 'field_line') fill(169);
  else if (mouseX > width - 304 && mouseX < width - 176 && mouseY > 176 && mouseY < 304) fill(240);
  else noFill();
  rect(16, 80, 128, 128, 16);
  noStroke();
  if (selected_tool == 'line' || selected == 'field_line') fill(255);
  else fill(169);
  text('Line', 58, 192);
  if (selected_tool == 'line' || selected == 'field_line') image(icon_line_white, 40, 88, 80, 80);
  else image(icon_line_grey, 40, 88, 80, 80);


  // arc
  push();
  translate(160, 0);
  strokeWeight(1);
  stroke(169);
  if (selected_tool == 'arc' || selected == 'field_arc') fill(169);
  else if (mouseX > width - 144 && mouseX < width - 16 && mouseY > 176 && mouseY < 304) fill(240);
  else noFill();
  rect(16, 80, 128, 128, 16);
  noStroke();
  if (selected_tool == 'arc' || selected == 'field_arc') fill(255);
  else fill(169);
  text('Arc', 64, 192);
  if (selected_tool == 'arc' || selected == 'field_arc') image(icon_arc_white, 40, 88, 80, 80);
  else image(icon_arc_grey, 40, 88, 80, 80);
  pop();

  // arc reverse thingy
  if (selected_tool == 'arc' || selected == 'field_arc') {
    if (pow(mouseX - (width - 272), 2) + pow(mouseY - (height - 48), 2) <= 16 * 16) fill(240);
    else noFill();
    strokeWeight(4);
    stroke(169);
    ellipse(48, height - 144, 32);
    noStroke();
    fill(169);
    text('Use long portion', 86, height - 135);

    // draw checl mark
    if (xor(reverse_current_arc, selected != 'field_arc' && keyIsDown(CONTROL))) {
      noStroke();
      fill(169);
      ellipse(48, height - 144, 16);
    }
  }
  

  pop();
}