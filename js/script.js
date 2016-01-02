var fromLeft, fromTop, gameareaOffset, direction;

setInterval(function() {;
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

  if (direction) {
      growWorm(fromLeft, fromTop, direction);
    }
}, 1000);

$(document).ready(function() {
    resetGame();
});

function setDirectionRight() { direction = "right"; }
function setDirectionDown() { direction = "down"; }
function setDirectionLeft() { direction = "left"; }
function setDirectionUp() { direction = "up"; }

function moveRight() {
  fromLeft = fromLeft + 10;
  if (fromLeft >= 100 + gameareaOffset.left) {
    fromLeft = fromLeft - 10;
    return;
  }
}

function moveDown() {
  fromTop = fromTop + 10;
  if (fromTop >= 100 + gameareaOffset.top) {
    fromTop = fromTop - 10;
    return;
  }
}

function moveLeft() {
  fromLeft = fromLeft - 10;
  if (fromLeft < gameareaOffset.left) {
    fromLeft = gameareaOffset.left;
    return;
  }
}

function moveUp() {
  fromTop = fromTop - 10;
  if (fromTop < gameareaOffset.top) {
    fromTop = gameareaOffset.top;
    return;
  }
}

function growWorm(x, y, direction) {
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
}

function createWormElement() {
  return '<div class="worm head"></div>';
}

function resetGame() {
  $("#gamearea").html(createWormElement());
  gameareaOffset = $("#gamearea .worm").offset();
  fromLeft = gameareaOffset.left;
  fromTop = gameareaOffset.top;
  direction = null;
}
