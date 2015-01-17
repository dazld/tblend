




function debounce(fn){
    
    var timeout;

    return function(){
        var args = [].slice.apply(arguments);
        
        if (timeout) {
            window.clearTimeout(timeout)
        }

        timeout = setTimeout(function() {
            fn.apply(null, args);
        }, 10);
    }    
    
}

module.exports = debounce;
