function isCoordinateFree(x, y, min, max) {
  if (isCoordinateReserved(x, y)) {
    return false;
  }

  if (x < min || x > max || y < min || y > max) {
    return false;
  }

  return true;
}

function getRandomCoordinateBetween(min, max) {
  var i = Math.floor(Math.random() * (max - min + 1) + min);
  i = i - (i % 10);
  return i;
}

function addObstacle(x, y) {
  $('<div class="obstacle"></div>').appendTo(getGameareaElement()).css({
    left: x  + 'px',
    top: y + 'px',
  });

  reserveCoordinate(x, y);
}

function createChunk(min, max, numberOfObstacles) {
  var x = getRandomCoordinateBetween(min, max),
    y = getRandomCoordinateBetween(min, max);
  addObstacle(x, y);
  var obstaclesCreates = 0, retries = 0;

  while (obstaclesCreates < numberOfObstacles
    && retries < numberOfObstacles * 100
  ) {
    retries++;

    var newX = getRandomCoordinateBetween(x - 20, x + 20),
      newY = getRandomCoordinateBetween(y - 20, y + 20);
    if (! isCoordinateFree(newX, newY, min, max)) {
      continue;
    }

    obstaclesCreates++;
    x = newX;
    y = newY;
    addObstacle(x, y);
  }
}

function generateObstacles(gameareaWidth) {
  var minCoordinate = gameareaWidth - gameareaWidth + 20;
  var maxCoordinate = gameareaWidth - 10;

  var numberOfChunks = gameareaWidth / 50;
  var numberOfObstaclesInChunk = gameareaWidth / 50;
  for (i = 0; i < numberOfChunks; i++) {

    createChunk(minCoordinate, maxCoordinate, numberOfObstaclesInChunk);
  }
}
