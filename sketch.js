let food;
let snake;
function setup() {
  createCanvas(600, 600);
  frameRate(10);
  snake = new Snake();
  let size = snake.length,
    foodX = getRandomInt(size / size, (width - size) / size) * size,
    foodY = getRandomInt(size / size, (height - size) / size) * size;
  food = new Food(foodX, foodY, size);
}
function mousePressed() {
  if (snake.hit) snake.reset();
}
function draw() {
  background(51);
  fill(0, 255, 0);
  food.show();
  snake.run(food);
}
