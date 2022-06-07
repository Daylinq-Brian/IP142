let options = {
    name: {
        value: 'download',
        input: null
    },
    viewbox: {
        value: {
            x: 0,
            y: 0
        },
        input: {
            x: null,
            y: null
        }
    },
    minify: {
        value: false,
        input: null
    }
}

// adding inputs to options object
$(document).ready(function (){
    options.name.input = document.getElementById('file-name-input');
    options.viewbox.input.x = document.getElementById('viewbox-x-input');
    options.viewbox.input.y = document.getElementById('viewbox-y-input');
    options.minify.input = document.getElementById('minify-input');
});