class Food {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.size = size;
  }
  show() {
    fill(255, 0, 0);
    rect(this.position.x, this.position.y, this.size);
  }
}
