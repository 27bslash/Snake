class Food {
  constructor() {
    this.position = createVector(
      Math.floor(random() * ((width - 10) / 10 - 10 + 1) + 1) * 10,
      Math.floor(random() * ((height - 10) / 10 - 10 + 1) + 1) * 10
    );
  }
  show() {
    console.log(this.position.x, this.position.y);
    fill(255, 0, 0);
    rect(this.position.x, this.position.y, 10);
  }
}
