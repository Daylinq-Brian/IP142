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
    },
    layer: {
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
    options.layer.input = document.getElementById('layer-input');

    // making minify toggle on/off for label
    options.minify.input.addEventListener('change', (e) => {
        let minifyLabel = document.getElementById('minify-input-label');
        minifyLabel.innerHTML = e.target.checked ? 'minify: on' : 'minify: off';
    });

    // making layer toggle on/off for label
    options.layer.input.addEventListener('change', (e) => {
        let layerLabel = document.getElementById('layer-input-label');
        layerLabel.innerHTML = e.target.checked ? 'layers: on' : 'layers: off';
    });

    // button to change all names to numbers
    document.getElementById('mass-rename').addEventListener('click', () => {
        for(let i = 0; i < files.content.length; i++){
            files.content[i].name = `${(i + 1).toString().padStart(files.content.length.toString().length, '0')}.svg`;
        }
        displayList();
        notification.add({type: 'numberRename', data: files.content.length});
    });
});