var fromLeft, fromTop;
var gameareaOffset, direction = null;
var gameInterval = null, isWormMoving = false, isGameOver = false;

function moveWorm() {
  if (! isWormMoving || isGameOver) {
    return;
  }
  switch (direction) {
    case "right":
      moveRight();
      break;
    case "down":
      moveDown();
      break;
    case "left":
      moveLeft();
      break;
    case "up":
      moveUp();
      break;
    default: // default omitted
      break;
  }

  if (! isGameOver && isWormMoving) {

    if (isCoordinateReserved(fromLeft, fromTop)) {
      gameOver();
      return false;
    }

    reserveCoordinate(fromLeft, fromTop);

    growWorm(fromLeft, fromTop, direction)
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
  fromLeft = fromLeft + 10;
  if (fromLeft >= 100 + gameareaOffset.left) {
    gameOver();
  }
}

function moveDown() {
  fromTop = fromTop + 10;
  if (fromTop >= 100 + gameareaOffset.top) {
    gameOver();
  }
}

function moveLeft() {
  fromLeft = fromLeft - 10;
  if (fromLeft < gameareaOffset.left) {
    gameOver();
  }
}

function moveUp() {
  fromTop = fromTop - 10;
  if (fromTop <= gameareaOffset.top) {
    gameOver();
  }
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

  fromLeft = gameareaOffset.left;
  fromTop = gameareaOffset.top;

  direction = null;
  resetCoordinates();
  isGameOver = false;
  if (gameInterval) {
    stopGame();
  }

  reserveCoordinate(fromLeft, fromTop);

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
