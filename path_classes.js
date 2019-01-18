class Point {

  constructor(x=0, y=0, angle=0) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

class Movement {
  constructor(type="none") {
    this.type = type;
  }
}

class Line extends Movement {
  constructor() {
    super("line");
  }
}

class Arc extends Movement {
  constructor(use_large_seg=false) {
    super("arc");
    this.use_large = false;
  }
}