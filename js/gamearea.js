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

function createWormElement() {
  return '<div class="worm head"></div>';
}

function setMessage(message) {
  $("#message").html(message);
}

function enableOptions(enable) {
  if (enable) {
    $("#options select").removeAttr("disabled");
    $("#options input").removeAttr("disabled");
  } else {
    $("#options select").attr("disabled", "disabled");
    $("#options input").attr("disabled", "disabled");
  }
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
