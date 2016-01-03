function growWorm(x, y, direction) {
  var last = getLastWormElement();
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
  $(createWormElement()).addClass(direction).appendTo(getGameareaElement()).offset({
    left: x,
    top: y
  });
}
