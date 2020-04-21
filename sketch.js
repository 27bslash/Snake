let food;
let snake;

function setup() {
  createCanvas(600, 600);
  frameRate(10)
  snake = new Snake();
  food = new Food();
}
function draw() {
  background(51);
  food.show();
  snake.run();
  snake.eat(food);
}
