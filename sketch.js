let food;
let snake;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  snake = new Snake();
  food = new Food();
}
function draw() {
  background(51);
  // for (let i = 0; i < 60; i++) {
  //   for (let j = 0; j < 60; j++) {
  //     fill(255);
  //     rect(i * 10, j * 10, 10, 10);
  //   }
  // }
  food.show();
  snake.run();
  snake.eat(food);
}
