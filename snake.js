class Snake {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.length = 15;
    this.history = [];
    this.lastKey = "";
    this.total = 0;
    this.hit = false;
    this.hitPos;
    this.highScore = 0;
  }
  run(food) {
    this.update();
    this.keyPressed();
    this.gameOver();
    this.eat(food);
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
    if (!this.hit) {
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
  }
  storeScore() {
    if (this.total > this.highScore) {
      this.highScore = this.total;
    }
    localStorage.setItem("highScore", this.highScore);
  }
  eat(food) {
    let foodX =
      getRandomInt(1, (width - this.length) / this.length) * this.length;
    let foodY =
      getRandomInt(1, (height - this.length) / this.length) * this.length;
    if (
      this.position.x == food.position.x &&
      this.position.y == food.position.y
    ) {
      food.position = createVector(foodX, foodY);
      this.total++;
      storeScore()
    }
  }
  borders() {
    if (
      this.position.x == width - this.length ||
      this.position.x == 0 ||
      this.position.y == height - this.length ||
      this.position.y == 0
    ) {
      this.hit = true;
      this.hitPos = createVector(this.position.x, this.position.y);
    }
  }
  reset() {
    this.hit = false;
    this.position = createVector(width / 2, height / 2);
    this.total = 0;
    this.history = [];
  }
  gameOver() {
    this.borders();
    for (let i = 0; i < this.history.length; i++) {
      let hist = this.history[i];
      let d = dist(this.position.x, this.position.y, hist.x, hist.y);
      if (d < 1) {
        this.hit = true;
        this.hitPos = createVector(hist.x, hist.y);
      }
    }
  }
  show() {
    for (let hist of this.history) {
      fill(0, 139, 0);
      noStroke();
      rect(hist.x, hist.y, this.length, this.length);
    }
    fill(0, 255, 0);
    rect(this.position.x, this.position.y, this.length, this.length);
    if (this.hit) {
      fill(255);
      rect(this.hitPos.x, this.hitPos.y, this.length);
      fill(0, 255, 0);
      textAlign(CENTER);
      textSize(40);
      text("GAME OVER", width / 2, 100);
      textSize(20);
      text(
        `Score: ${snake.total} High Score: ${localStorage.getItem(
          "highScore"
        )}`,
        width / 2,
        130
      );
      text("Play Again?", width / 2, 160);
    } else {
      text(snake.total, width / 2, 100);
      textSize(40);
    }
  }
}
function getRandomInt(min, max) {
  return Math.floor(random() * (max - min + 1) + min);
}
