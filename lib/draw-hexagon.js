
// https://gist.github.com/zackthehuman/1867663
var hexHeight,
hexRadius,
hexRectangleHeight,
hexRectangleWidth,
hexagonAngle = 0.523598776, // 30 degrees in radians
    sideLength = 12,
    hexHeight = Math.sin(hexagonAngle) * sideLength;
hexRadius = Math.cos(hexagonAngle) * sideLength;
hexRectangleHeight = sideLength + 2 * hexHeight;
hexRectangleWidth = 2 * hexRadius;

function drawHexagon(canvasContext, x, y, fill) {
    var fill = fill || false;

    canvasContext.beginPath();
    canvasContext.globalCompositeOperation = 'source-over';
    //canvasContext.globalCompositeOperation = compmode.value;
    canvasContext.strokeStyle = "rgba(0,0,0,0.5)";
    canvasContext.lineWidth = 1;
    canvasContext.moveTo(x + hexRadius, y);
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
    canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
    canvasContext.lineTo(x, y + sideLength + hexHeight);
    canvasContext.lineTo(x, y + hexHeight);
    canvasContext.closePath();

    if (fill) {
        canvasContext.fillStyle = fill;
        canvasContext.fill();
    }
    // canvasContext.stroke();
}

module.exports = drawHexagon;
