var fromLeft, fromTop, gameareaOffset;

$(document).ready(function() {
    resetGame();
});

function moveLeft() {
    fromLeft = fromLeft - 10;
    if (fromLeft < gameareaOffset.left) {
        fromLeft = gameareaOffset.left;
        return;
    }
    growWorm(fromLeft, fromTop);
}

function moveUp() {
    fromTop = fromTop - 10;
    if (fromTop < gameareaOffset.top) {
        fromTop = gameareaOffset.top;
        return;
    }
    growWorm(fromLeft, fromTop);
}

function moveDown() {
    fromTop = fromTop + 10;
    if (fromTop >= 100 + gameareaOffset.top) {
        fromTop = fromTop - 10;
        return;
    }
    growWorm(fromLeft, fromTop);
}

function moveRight() {
    fromLeft = fromLeft + 10;
    if (fromLeft >= 100 + gameareaOffset.left) {
        fromLeft = fromLeft - 10;
        return;
    }
    growWorm(fromLeft, fromTop);
}

function growWorm(x, y) {
    $("#gamearea .worm:last").clone().appendTo("#gamearea").offset({
        left: x,
        top: y
    });
}

function resetGame() {
    $("#gamearea").html('<div class="worm"></div>');
    gameareaOffset = $("#gamearea .worm").offset();
    fromLeft = gameareaOffset.left;
    fromTop = gameareaOffset.top;
}