let exporter = {};

exporter.makeFile = async() => {
    let template = await exporter.loadTemplate();
    let styleString = '';
    let groupString = '';

    // filling the style and group string
    for(let svg of formattedSVGs.svgs){
        styleString += svg.style;
        groupString += svg.group;
    }

    // clearing the formatted svg's array
    formattedSVGs.svgs = [];

    // testing for and setting the viewbox values
    if(options.viewbox.input.x.value == '' || options.viewbox.input.y.value == ''){
        // grabbing the viewbox from the first svg in the array
        let svgObject = createElementFromHTML(files.content[0].content);
        options.viewbox.value.x = svgObject.getAttribute('viewBox').split(' ')[2];
        options.viewbox.value.y = svgObject.getAttribute('viewBox').split(' ')[3];
    }else{
        // if both viewbox inputs are set then pick those
        options.viewbox.value.x = options.viewbox.input.x.value;
        options.viewbox.value.y = options.viewbox.input.y.value;
    }

    // filling the template
    template = template.replaceAll('__VIEWBOX-X__', options.viewbox.value.x);
    template = template.replaceAll('__VIEWBOX-Y__', options.viewbox.value.y);
    template = template.replace('__STYLING__', styleString);
    template = template.replace('__GROUPS__', groupString);
    
    console.log(template);
    exporter.download(options.name.input.value == '' ? `${options.name.value}.svg` : `${options.name.input.value}.svg`, template);
}

// this function loads the template
exporter.loadTemplate = () => {
    return new Promise(resolve => {
        $.ajax({
            url: 'dependencies/template.txt',
            success: function (data){
                resolve(data);
            }
        });
    });
}

// function for downloading text to a file
exporter.download = (fileName, content) => {
    var element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
