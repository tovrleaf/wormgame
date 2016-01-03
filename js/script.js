var fromLeft, fromTop;
var gameareaOffset, direction = null;
var gameInterval = null, isWormMoving = false, isGameOver = false;
var coor = [];

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
    if (growWorm(fromLeft, fromTop, direction)) {
      $("#message").html(getScore());
    }
  }
};

$(document).ready(function() {
  resetGame();
});

function setDirectionRight() {
  if (gameInterval) {
    direction = "right";
  }
}

function setDirectionDown() {
  if (gameInterval) {
    direction = "down";
  }
}

function setDirectionLeft() {
  if (gameInterval) {
    direction = "left";
  }
}

function setDirectionUp() {
  if (gameInterval) {
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

function growWorm(x, y, direction) {
  if (coor[x] && coor[x][y]) {
    gameOver();
    return false;
  }

  reserveCoordinate(x, y);

  var last = $("#gamearea .worm:last");
  last.removeClass("head");
  if (direction == "left") {
    last.addClass("right");
  }
  if (direction == "down") {
    last.addClass("up");
  }
  if (direction == "up") {
    last.addClass("down");
  }
  if (direction == "right") {
    last.addClass("left");
  }
  if (last.hasClass("left") && last.hasClass("right")) {
    last.addClass("fullWidth");
  }
  if (last.hasClass("up") && last.hasClass("down")) {
      last.addClass("fullHeight");
  }
  $(createWormElement()).addClass(direction).appendTo("#gamearea").offset({
    left: x,
    top: y
  });

  return true;
}

function createWormElement() {
  return '<div class="worm head"></div>';
}

function gameOver() {
  stopGame();
  $("#message").html("Game Over!<br>" + getScore());
}

function startGame() {
  if (isGameOver) {
    return;
  }

  if (isWormMoving) {
    stopGame();
  } else {
    isWormMoving = true;
    gameInterval = setInterval(moveWorm, 300);
    if (! direction) {
      setDirectionRight();
    }
  }
}

function resetGame() {
  $("#gamearea").html(createWormElement());
  gameareaOffset = $("#gamearea .worm").offset();

  fromLeft = gameareaOffset.left;
  fromTop = gameareaOffset.top;

  direction = null;
  coor = [];
  isGameOver = false;
  if (gameInterval) {
    stopGame();
  }

  reserveCoordinate(fromLeft, fromTop);

  $("#message").html("");
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  isGameOver = true;
  isWormMoving = false;
}

function reserveCoordinate(x, y) {
  if (! coor[x]) {
    coor[x] = [];
  }
  coor[x][y] = true;
}

function getScore() {
  return "Your score: " + $("#gamearea .worm").size();
}
