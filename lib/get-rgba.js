function getRGBA(rgb) {
    return ['rgba(' + rgb[0], rgb[1], rgb[2], '1)'].join();
}
module.exports = getRGBA;
