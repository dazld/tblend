var debounce = require('./lib/debounce');
var createColorPicker = require('./lib/picker');
var drawHexagon = require('./lib/draw-hexagon');
var getRGBA = require('./lib/get-rgba');
var stage = require('./lib/stage'),
    canvas = stage.canvas,
    ctx = stage.ctx,
    setup = stage.setup;

var slider = document.getElementById('rows');


// this is still quite raw, ideally should be scaling
// between three arbitrary colours

function scale(x, y, c1, c2, max) {

    var rX = (x / max);
    var rY = (y / max);

    var invRX = Math.abs(rX - 1);
    var invRY = Math.abs(rY - 1);

    var red1 = (c1[0] * invRX) >> 0;
    var green1 = (c1[1] * invRX) >> 0;
    var blue1 = (c1[2] * invRX) >> 0;

    var red2 = (c2[0] * rY) >> 0;
    var green2 = (c2[1] * rY) >> 0;
    var blue2 = (c2[2] * rY) >> 0;


    return [
        red1 + red2, 
        green1 + green2, 
        blue1 + blue2
    ];
}


var c1 = [255, 0, 0];
var c2 = [0, 0, 255];


createColorPicker(c1, function(value) {
    c1 = value;
    run();
});

createColorPicker(c2, function(value) {
    c2 = value;
    run();
});


function getScaledAtPoint(x, y, max) {
    var col1 = c1;
    var col2 = c2;

    if (x > 0) {
        col1 = scale(x, y, col1, col2, max);
    }

    // if (y > 0) {
    //   col2 = scale(x,y,col1,col2, max);
    // }

    var rgb = scale(x, y, col1, col2, max);
    return getRGBA(rgb);
}

function draw() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var rows = slider.value;
    var x = 0;
    var y = 40;
    var fill;

    for (var i = 0; i < rows; i++) {

        x = (w / 2) - (i * 10);
        y = y + 18;

        for (var t = 0; t <= i; t++) {
            x = x + 20.5;
            fill = getScaledAtPoint(i, t, rows);
            drawHexagon(ctx, x, y, fill);
        }
    }
}

document.body.appendChild(canvas);

function run() {
    setup();
    draw();
}

slider.addEventListener('input', debounce(run));
window.addEventListener('resize', debounce(run));
run();
