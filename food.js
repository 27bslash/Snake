class Food {
  constructor() {
    this.position = createVector(
      random(10, width - 10),
      random(10, height - 10)
    );
  }
  update() {}
  show() {
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 10);
  }
}
