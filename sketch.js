/// <reference path="./p5_intellisense/p5.global-mode.d.ts" />

var field_img;
var img_scale;

function preload() {

  field_img = loadImage(config.field_img);

}

function setup() {

  // setup canvas
  createCanvas(windowWidth, windowHeight);

  // setup angle mode
  angleMode(DEGREES);

  // do image calculations
  let img_ratio = field_img.width/field_img.height;
  let display_ratio = width/(height - 96);
  if (img_ratio > display_ratio * .66667) img_scale = width * .66667 / field_img.width;
  else img_scale = (height - 96) / field_img.height;

}

function draw() {
  background('#FAFAFA');

  // draw title bar
  fill('#2196F3');
  noStroke();
  rect(0, 0, width, 96);
  fill('#FAFAFA');
  textSize(48);
  text(config.game_name, 16, 48);
  textSize(24);
  text("Autonomous planner", 24, 80);

  // draw field
  image(field_img, 0, 96, field_img.width*img_scale, field_img.height*img_scale);

  // draw path
  // console.log("A");
  draw_path_moves();

}