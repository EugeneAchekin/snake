// Подключение канваса и установка контекста
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Загрузка изображения для земли и еды
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32; // Размер одной клетки на игровом поле

let score = 0; // Начальный счёт

// Начальные координаты еды
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

// Начальные координаты змейки
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// Обработчик события нажатия клавиш
document.addEventListener("keydown", direction);

let dir;

// Функция для определения направления движения змейки
function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
}

// Функция проверки, не врезалась ли змейка в себя
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game); // Остановка игры
  }
}

// Функция отрисовки игрового поля
function drawGame() {
  ctx.drawImage(ground, 0, 0); // Отрисовка земли

  ctx.drawImage(foodImg, food.x, food.y); // Отрисовка еды

  // Отрисовка змейки
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red"; // Голова змейки - зелёная, тело - красное
    ctx.fillRect(snake[i].x, snake[i].y, box, box); // Размер и координаты каждого элемента змейки
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7); // Отображение счёта

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Если змейка съела еду
  if (snakeX == food.x && snakeY == food.y) {
    score++; // Увеличение счёта
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box, // Выбор новых координат для еды
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop(); // Убрать последний элемент змейки (таким образом, она "растёт" при поедании еды)+
  }

  // Проверка на выход змейки за пределы игрового поля-
  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game); // Остановка игры, если условие выполнено
  }

  // Изменение координат головы змейки в зависимости от выбранного направления
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake); // Проверка на столкновение с хвостом

  snake.unshift(newHead); // Добавление новой головы змейке
}

// Запуск игры с интервалом в 200 миллисекунд
let game = setInterval(drawGame, 200);


