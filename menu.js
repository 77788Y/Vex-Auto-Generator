let selected_tool = null;

function draw_menu() {
  push();

  // draw shadow
  translate(width - 320 - 32, 96);
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
  if (selected_tool == 'line') fill(169);
  else noFill();
  rect(16, 80, 128, 128, 16);
  noStroke();
  if (selected_tool == 'line') fill(255);
  else fill(169);
  text('Line', 58, 192);
  if (selected_tool == 'line') image(icon_line_white, 40, 88, 80, 80);
  else image(icon_line_grey, 40, 88, 80, 80);


  // arc
  push();
  translate(160, 0);
  strokeWeight(1);
  stroke(169);
  if (selected_tool == 'arc') fill(169);
  else noFill();
  rect(16, 80, 128, 128, 16);
  noStroke();
  if (selected_tool == 'arc') fill(255);
  else fill(169);
  text('Arc', 64, 192);
  if (selected_tool == 'acr') image(icon_arc_white, 40, 88, 80, 80);
  else image(icon_arc_grey, 40, 88, 80, 80);
  pop();

  pop();
}