const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//variabeldasar
const grid = 20;
let count = 0;
let score = 0;
const scoreDisplay = document.getElementById("scoreDisplay");

// objek ularnya
let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

// objek apel
let apple = {
  x: 320,
  y: 320
};

// fungsi acak posisi apel
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateScore() {
  scoreDisplay.innerText = "Skor: " + score;
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  apple.x = getRandomInt(0, 20) * grid;
  apple.y = getRandomInt(0, 20) * grid;
  score = 0;
  updateScore();
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 6) return;
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

// untuk menembus dinding
  if (snake.x < 0) snake.x = canvas.width - grid;
  if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Gambar apel
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

  // Gambar ular
  ctx.fillStyle = "lime";
  snake.cells.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

    // Ular makan apel
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      updateScore();
      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    // Tabrakan dengan tubuh sendiri
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        resetGame();
      }
    }
  });
}

// untuk kontrol keyboardnya
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

updateScore(); // Inisialisasi skor awal
requestAnimationFrame(loop);
