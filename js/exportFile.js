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

    // filling the template
    template = template.replace('__STYLING__', styleString);
    template = template.replace('__GROUPS__', groupString);
    
    console.log(template);
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