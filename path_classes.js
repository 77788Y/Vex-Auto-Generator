class Point {

  constructor(x=0, y=0, angle=0) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.is_tentative = false;
  }
}

class Movement {
  constructor(type="none") {
    this.type = type;
    this.is_tentative = false;
  }
}

class Line extends Movement {
  constructor() {
    super("line");
    this.angle = 0;
  }
}

class Arc extends Movement {
  constructor(use_large_seg=false) {
    super("arc");
    this.use_large = false;
    this.radius = 0;
    this.angle_start = 0;
    this.angle_diff = 0;
    this.angle_end = 0;
    this.center_x = 0;
    this.center_y = 0;
  }
}