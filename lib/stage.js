
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

function setup() {

    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    canvas.setAttribute('width', window.innerWidth + 'px');
    canvas.setAttribute('height', window.innerHeight + 'px');

    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1,
        ratio = devicePixelRatio / backingStoreRatio;

    // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
        ctx.scale(ratio, ratio);
    }
}

module.exports = {
    setup: setup,
    canvas: canvas,
    ctx: ctx
};


