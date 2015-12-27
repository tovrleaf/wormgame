var fromLeft = 0;
var fromTop = 0;

function moveLeft() {
    fromLeft = fromLeft - 10;
    if (fromLeft < 0) {
        fromLeft = 0;
        return;
    }
    $("#worm").css({
        left: fromLeft + 'px'
    });
}

function moveUp() {
    fromTop = fromTop - 10;
    if (fromTop < 0) {
        fromTop = 0;
        return;
    }
    $("#worm").css({
        top: fromTop + 'px'
    });
}

function moveDown() {
    fromTop = fromTop + 10;
    if (fromTop >= 100) {
        fromTop = fromTop - 10;
        return;
    }
    $("#worm").css({
        top: fromTop + 'px'
    });
}

function moveRight() {
    fromLeft = fromLeft + 10;
    if (fromLeft >= 100) {
        fromLeft = fromLeft - 10;
        return;
    }
    $("#worm").css({
        left: fromLeft + 'px'
    });
}

function resetGame() {
    fromLeft = 0;
    fromTop = 0;
    $("#worm").css({
        left: fromLeft + 'px',
        top: fromTop + 'px'
    });
}