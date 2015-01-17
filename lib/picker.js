var getRGBA = require('./get-rgba');

function createColorPicker(seedRgb, cb) {
    var pickerBase = document.createElement('input');
    var r = pickerBase.cloneNode();
    var g = pickerBase.cloneNode();
    var b = pickerBase.cloneNode();

    var cvalue = [];

    function onChange() {
        var vals = [r, g, b].reduce(function(memo, el) {
            memo.push(el.value)
            return memo;
        }, []);

        function sum(a, b) {
            if (typeof b === 'object' && b.length > 1) {
                return parseInt(a, 10) + b.reduce(sum, 0);
            }
            return parseInt(a, 10) + parseInt(b, 10);
        }

        var total = vals.reduce(sum, 0);

        [r, g, b].forEach(function(el) {
            el.style.backgroundColor = getRGBA(vals);
            if (total < 255) {
                el.style.color = 'white';
            } else {
                el.style.color = 'black';
            }
        });

        cb(vals);
    }

    [r, g, b].forEach(function(el, idx) {
        el.value = seedRgb[idx];
        el.style.backgroundColor = getRGBA(seedRgb);
        el.type = 'text';
        el.addEventListener('keyup', onChange)
    });

    var frag = document.createDocumentFragment();
    var holder = document.createElement('div');
    holder.className = 'picker';
    [r, g, b].forEach(function(el) {
        holder.appendChild(el);
    });
    frag.appendChild(holder);
    document.body.appendChild(frag);

}

module.exports = createColorPicker;
