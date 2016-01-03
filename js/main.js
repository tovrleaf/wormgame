var gameareaOffset, direction = null;
var gameInterval = null, isGameOver = false;

function moveWorm() {
  if (isGameOver) {
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

  if (! isGameOver) {

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
  $('body').keydown(function(e) {
    switch (e.keyCode) {
      case 32:
        startGame();
        break;
      case 37:
        setDirectionLeft();
        break;
      case 38:
        setDirectionUp();
        break;
      case 39:
        setDirectionRight();
        break;
      case 40:
        setDirectionDown();
        break;
      case 82:
        resetGame();
    }
  });
});

function setDirectionRight() {
  if (gameInterval && direction != "left") {
    direction = "right";
  }
}

function setDirectionDown() {
  if (gameInterval && direction != "up") {
    direction = "down";
  }
}

function setDirectionLeft() {
  if (gameInterval && direction != "right") {
    direction = "left";
  }
}

function setDirectionUp() {
  if (gameInterval && direction != "down") {
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

  if (gameInterval) {
    stopGame();
    setMessage("Pause");
  } else {
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
}


function getScore() {
  return "Your score: " + getWormElement().size();
}
