var gameareaOffset, direction = null;
var gameInterval = null, isWormMoving = false, isGameOver = false;

function moveWorm() {
  if (! isWormMoving || isGameOver) {
    return;
  }

  var l = getWormLocation();
  var x = l.x, y = l.y;

  switch (direction) {
    case "right":
      x = moveRight();
      break;
    case "down":
      y = moveDown();
      break;
    case "left":
      x = moveLeft();
      break;
    case "up":
      y = moveUp();
      break;
    default: // default omitted
      break;
  }

  if (! isGameOver && isWormMoving) {

    if (isCoordinateReserved(x, y)) {
      gameOver();
      return false;
    }

    reserveCoordinate(x, y);

    growWorm(x, y, direction)
    setMessage(getScore());
  }
};

$(document).ready(function() {
  resetGame();
});

function setDirectionRight() {
  if (isWormMoving && direction != "left") {
    direction = "right";
  }
}

function setDirectionDown() {
  if (isWormMoving && direction != "up") {
    direction = "down";
  }
}

function setDirectionLeft() {
  if (isWormMoving && direction != "right") {
    direction = "left";
  }
}

function setDirectionUp() {
  if (isWormMoving && direction != "down") {
    direction = "up";
  }
}

function moveRight() {
  var x = getWormLocation().x + 10;
  if (x >= 100 + gameareaOffset.left) {
    gameOver();
  }
  return x;
}

function moveDown() {
  var y = getWormLocation().y + 10;
  if (y >= 100 + gameareaOffset.top) {
    gameOver();
  }
  return y;
}

function moveLeft() {
  var x = getWormLocation().x - 10;
  if (x < gameareaOffset.left) {
    gameOver();
  }
  return x;
}

function moveUp() {
  var y = getWormLocation().y - 10;
  if (y <= gameareaOffset.top) {
    gameOver();
  }
  return y;
}

function createWormElement() {
  return '<div class="worm head"></div>';
}

function gameOver() {
  stopGame();
  setMessage("Game Over!<br>" + getScore());
}

function startGame() {
  if (isGameOver) {
    return;
  }

  if (isWormMoving) {
    stopGame();
    setMessage("Pause");
  } else {
    isWormMoving = true;
    gameInterval = setInterval(moveWorm, 300);
    if (! direction) {
      setDirectionRight();
    }
  }
}

function resetGame() {
  getGameareaElement().html(createWormElement());
  gameareaOffset = getLastWormElement().offset();

  direction = null;
  resetCoordinates();
  isGameOver = false;
  if (gameInterval) {
    stopGame();
  }

  var l = getWormLocation();
  var x = l.x, y = l.y;

  reserveCoordinate(x, y);

  setMessage("");
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  isWormMoving = false;
}


function getScore() {
  return "Your score: " + getWormElement().size();
}
