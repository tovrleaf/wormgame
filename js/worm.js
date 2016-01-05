function growWorm(x, y, direction, speed) {
  var last = getLastWormElement();
  last.removeClass("head");

  var prevX = x, prevY = y;

  if (direction == "left") {
    last.addClass("right");
    prevX += 10;
  }
  if (direction == "down") {
    last.addClass("up");
    prevY -= 10;
  }
  if (direction == "up") {
    last.addClass("down");
    prevY += 10;
  }
  if (direction == "right") {
    last.addClass("left");
    prevX -= 10;
  }
  if (last.hasClass("left") && last.hasClass("right")) {
    last.addClass("fullWidth");
  }
  if (last.hasClass("up") && last.hasClass("down")) {
    last.addClass("fullHeight");
  }

  getWormElement().each(function() {
    var o = $(this).css("opacity");
    o = o - 0.01;
    if (o >= 0.25) {
      $(this).css("opacity", o);
    }
  });

  $(createWormElement()).addClass(direction).appendTo(getGameareaElement()).css({
    left: prevX,
    top: prevY
  }).animate({
    left: x,
    top: y
  }, {
    duration: speed
  });
}

function getWormLocation() {
  var o = getLastWormElement().offset();
  return {
    x: Math.round(o.left),
    y: Math.round(o.top)
  };
}
