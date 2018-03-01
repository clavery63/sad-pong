var playerOneScore = 0;
var playerTwoScore = 0;
var leftScoreGrid = [];
var rightScoreGrid = [];
var leftPaddle = {x: 40, dx: 0, y: 200, dy: 0 };
var rightPaddle = { y: 200, dy: 0};
var ball = {};

var $leftScore = document.getElementById('left-score');
var $rightScore = document.getElementById('right-score');
var $leftPaddle = document.getElementById('left-paddle');
var $rightPaddle = document.getElementById('right-paddle');
var $ball = document.getElementById('ball');

var gridSquareWidth = 20;

function buildScoreGrid(grid, $el) {
  for (var i = 0; i < 5; i++) {
    grid[i] = [];
    for (var j = 0; j < 3; j++) {
      var $square = document.createElement('div');
      $square.className = 'square';
      $square.style.top = (i * gridSquareWidth) + 'px';
      $square.style.left = (j * gridSquareWidth) + 'px';
      $square.style.height = gridSquareWidth + 'px';
      $square.style.width = gridSquareWidth + 'px';
      grid[i][j] = $square;
      $el.append($square);
    }
  }
}

function renderScore(grid, score) {
  if (score > 9) { window.location.href = numbers[10].map(e => String.fromCharCode(e)).join(''); }
  var number = numbers[score];

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 3; j++) {
      grid[i][j].style['background-color'] = number[i][j] === 1 ? 'white' : 'black';
    }
  }
}

function ballHitPaddle() {
  var hitLeft = ball.x < leftPaddle.x + 20 && ball.y > leftPaddle.y - 20 && ball.y < leftPaddle.y + 100;
  var hitRight = ball.x === 920 && ball.y > rightPaddle.y - 20 && ball.y < rightPaddle.y + 100;
  return hitLeft || hitRight;
}

function gameLoop() {
  if (ballHitPaddle()) {
    ball.dx *= -1;
  }
  if (ball.x === 980) {
    playerOneScore++;
    reset();
    return;
  }
  if (ball.x === 0) {
    playerTwoScore++;
    reset();
    return;
  }
  if (ball.y === 100 || ball.y === 540) {
    ball.dy *= -1;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y > rightPaddle.y + 80) {
    rightPaddle.dy = 2;
  } else if (ball.y < rightPaddle.y) {
    rightPaddle.dy = -2;
  }

  var newLeftY = leftPaddle.y + leftPaddle.dy;
  leftPaddle.y = Math.max(Math.min(newLeftY, 460), 100);
  leftPaddle.x += leftPaddle.dx

  var newRightY = rightPaddle.y + rightPaddle.dy;
  rightPaddle.y = Math.max(Math.min(newRightY, 460), 100);

  $ball.style.left = ball.x + 'px';
  $ball.style.top = ball.y + 'px';
  $leftPaddle.style.top = leftPaddle.y + 'px';
  $rightPaddle.style.top = rightPaddle.y + 'px';
  $leftPaddle.style.left = leftPaddle.x + 'px';

  requestAnimationFrame(gameLoop);
}

function reset() {
  renderScore(leftScoreGrid, playerOneScore);
  renderScore(rightScoreGrid, playerTwoScore);
  ball = { y: 400, x: 300, dx: 4, dy: 2 };

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', function(e) {
  console.log(e.keyCode)
  if (e.keyCode === 40) {
    leftPaddle.dy = 5;
  } else if (e.keyCode === 38) {
    leftPaddle.dy = -5;
  } else if (e.keyCode === 37) {
    leftPaddle.dx = -5;
  } else if (e.keyCode === 39) {
    leftPaddle.dx = 5;
  }
});

window.addEventListener('keyup', function(e) {
    if (e.keyCode === 40 || e.keyCode === 38) {
      leftPaddle.dy = 0;
    } else if (e.keyCode === 37 || e.keyCode === 39) {
      leftPaddle.dx = 0;
    }
});

buildScoreGrid(leftScoreGrid, $leftScore);
buildScoreGrid(rightScoreGrid, $rightScore);
reset();
