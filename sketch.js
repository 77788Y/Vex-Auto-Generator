/// <reference path="./p5_intellisense/p5.global-mode.d.ts" />

let selected = null;
let selected_index = 0;

var field_img;
var img_scale;
var field_size;
var icon_line_grey;
var icon_line_white;
var icon_arc_grey;
var icon_arc_white;

var color_bg, color_highlight, color_transparent, color_black, color_translucent_black;

function preload() {
  field_img = loadImage(config.field_img);
  icon_line_grey = loadImage('./res/icon_line_grey.png');
  icon_line_white = loadImage('./res/icon_line_white.png');
  icon_arc_grey = loadImage('./res/icon_arc_grey.png');
  icon_arc_white = loadImage('./res/icon_arc_white.png');
}

function setup() {

  // setup canvas
  createCanvas(windowWidth, windowHeight);

  // setup angle mode
  angleMode(DEGREES);

  // define colors
  color_bg = color('#FAFAFA');
  color_highlight = color('#2196F3');
  color_transparent = color(0, 0);
  color_black = color(0);
  color_translucent_black = color(0, 128);

  // do image calculations
  let img_ratio = field_img.width/field_img.height;
  let display_ratio = (width - 320)/(height - 96);
  if (img_ratio > display_ratio) img_scale = (width - 320) / field_img.width;
  else img_scale = (height - 96) / field_img.height;

  field_size = field_img.width * img_scale;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let img_ratio = field_img.width/field_img.height;
  let display_ratio = (width - 320)/(height - 96);
  if (img_ratio > display_ratio) img_scale = (width - 320) / field_img.width;
  else img_scale = (height - 96) / field_img.height;

  field_size = field_img.width * img_scale;
}

function draw() {
  background(color_bg);

  // draw field
  image(field_img, 0, 96, field_img.width*img_scale, field_img.height*img_scale);

  // draw path
  push();
  translate(0, 96);
  draw_path_moves();
  draw_path_points();
  pop();

  // draw side menu
  draw_menu();

  // draw title bar
  fill(color_highlight);
  noStroke();
  rect(0, 0, width, 96);
  fill(color_bg);
  textSize(48);
  text(config.game_name, 16, 48);
  textSize(24);
  text("Autonomous generator", 24, 80);

  // draw title bar shadow
  setGradient(0, 96, width - 320, 16, color_translucent_black, color_transparent, 'Y');
  setGradient(width - 320, 96, 320, 8, color_translucent_black, color_transparent, 'Y');
}