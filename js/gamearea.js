var coor = [];

function getGameareaElement() {
  return $("#gamearea");
}

function getLastWormElement() {
  return $("#gamearea .worm:last");
}

function getWormElement() {
  return $("#gamearea .worm");
}

function setMessage(message) {
  $("#message").html(message);
}

function isCoordinateReserved(x, y) {
  return coor[x] && coor[x][y];
}

function reserveCoordinate(x, y) {
  if (! coor[x]) {
    coor[x] = [];
  }
  coor[x][y] = true;
}

function resetCoordinates() {
  coor = [];
}
