collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;
  // which edge is closest?
  if (cx < rx) {
    testX = rx; // left edge
  } else if (cx > rx + rw) {
    testX = rx + rw;
  } // right edge
  if (cy < ry) {
    testY = ry; // top edge
  } else if (cy > ry + rh) {
    testY = ry + rh;
  } // bottom edge
  // // get distance from closest edges
  var distance = this.dist(cx, cy, testX, testY);
  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
};
class Snake {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.length = 10;
    this.history = [];
    this.lastKey = "";
    this.total = 0;
  }
  run() {
    this.update();
    this.keyPressed();
    this.gameOver();
    this.borders();
    this.show();
  }
  keyPressed() {
    if (keyCode === LEFT_ARROW && this.lastKey != "right") {
      this.lastKey = "left";
    }
    if (keyCode === RIGHT_ARROW && this.lastKey != "left") {
      this.lastKey = "right";
    }
    if (keyCode === UP_ARROW && this.lastKey != "down") {
      this.lastKey = "up";
    }
    if (keyCode === DOWN_ARROW && this.lastKey != "up") {
      this.lastKey = "down";
    }
  }
  update() {
    let h = createVector(this.position.x, this.position.y);
    this.history.push(h);
    if (this.history.length > this.total) {
      this.history.shift();
    }
    switch (this.lastKey) {
      case "left":
        this.position.x -= this.length;
        break;
      case "right":
        this.position.x += this.length;
        break;
      case "up":
        this.position.y -= this.length;
        break;
      case "down":
        this.position.y += this.length;
        break;
    }
  }
  eat(food) {
    if (
      this.position.x == food.position.x &&
      this.position.y == food.position.y
    ) {
      food.position = createVector(
        Math.floor(random() * ((width - 10) / 10 - 10 + 1) + 1) * 10,
        Math.floor(random() * ((height - 10) / 10 - 10 + 1) + 1) * 10
      );
      this.total++;
    }
  }
  borders() {
    if (
      this.position.x == width ||
      this.position.x == 0 ||
      this.position.y == height ||
      this.position.y == 0
    ) {
      this.position = createVector(width / 2, height / 2);
      this.total = 0;
      this.history = [];
    }
  }
  gameOver() {
    for (let i = 0; i < this.history.length; i++) {
      let hist = this.history[i];
      let d = dist(this.position.x, this.position.y, hist.x, hist.y);
      if (d < 1) {
        this.position = createVector(width / 2, height / 2);
        this.total = 0;
        this.history = [];
      }
    }
  }
  show() {
    fill(0, 255, 0);
    noStroke();
    for (let hist of this.history) {
      rect(hist.x, hist.y, this.length, this.length);
    }
    text(this.total, width / 2, 100);
    textSize(40);
    fill(255);
    rect(this.position.x, this.position.y, this.length, this.length);
  }
}
