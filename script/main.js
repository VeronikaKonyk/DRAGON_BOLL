// script/main.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dragonSize = 120;
let dragonX = canvas.width / 2 - dragonSize / 2;
let dragonY = canvas.height / 2 - dragonSize / 2;
let dragonSpeed = 5;

let balls = [];

document.addEventListener("keydown", moveDragon);

function moveDragon(e) {
  switch (e.key) {
    case "ArrowLeft":
      dragonX -= dragonSpeed;
      drawDragon("img/dragon_walksL.gif");
      break;
    case "ArrowRight":
      dragonX += dragonSpeed;
      drawDragon("img/dragon_walksR.gif");
      break;
    case "ArrowUp":
      dragonY -= dragonSpeed;
      drawDragon("img/dragon_walksStr.gif");
      break;
    case "ArrowDown":
      dragonY += dragonSpeed;
      drawDragon("img/dragon_walksStr.gif");
      break;
  }
  if (
    dragonX < 0 ||
    dragonX + dragonSize > canvas.width ||
    dragonY < 0 ||
    dragonY + dragonSize > canvas.height
  ) {
    endGame();
  }
  balls = balls.filter((ball) => {
    if (checkCollision(ball, dragonX, dragonY, dragonSize)) {
      return false;
    } else {
      return true;
    }
  });
  generateBalls();
  drawBalls();
}

function generateBalls() {
  if (Math.random() < 0.02) {
    const ballSize = 20;
    const ballX = Math.random() * (canvas.width - ballSize);
    const ballY = Math.random() * (canvas.height - ballSize);
    const ballColor = "#FFD700"; // Lemon color

    balls.push({ x: ballX, y: ballY, size: ballSize, color: ballColor });
  }
}

function drawBalls() {
  balls.forEach((ball) => {
    ctx.beginPath();
    ctx.arc(
      ball.x + ball.size / 2,
      ball.y + ball.size / 2,
      ball.size / 2,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  });
}

function checkCollision(ball, x, y, size) {
  return (
    x < ball.x + ball.size &&
    x + size > ball.x &&
    y < ball.y + ball.size &&
    y + size > ball.y
  );
}

function drawDragon(imagePath) {
  const dragonImg = new Image();
  dragonImg.src = imagePath;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(dragonImg, dragonX, dragonY, dragonSize, dragonSize);
  drawBalls();
  requestAnimationFrame(() => moveDragon({ key: "" }));
}

function endGame() {
  alert("Game Over! Dragon collided with the edge.");
}
drawDragon("img/dragon_walksStr.gif");
