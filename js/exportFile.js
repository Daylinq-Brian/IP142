let exporter = {};

exporter.makeFile = async() => {
    if(options.layer.input.checked){
        let template = await exporter.loadTemplate('dependencies/layerTemplate.txt');
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
        template = template.replace('__STYLING__', options.minify.input.checked ? vkbeautify.cssmin(styleString) : vkbeautify.css(styleString));
        template = template.replace('__GROUPS__', groupString);
        
        console.log(options.minify.input.checked ? vkbeautify.xmlmin(template) : vkbeautify.xml(template));
        exporter.download(options.name.input.value == '' ? `${options.name.value}.svg` : `${options.name.input.value}.svg`, 
                        options.minify.input.checked ? vkbeautify.xmlmin(template) : vkbeautify.xml(template));
    
        notification.add({type: 'downloadSingle', data: options.name.input.value == '' ? `${options.name.value}.svg` : `${options.name.input.value}.svg`});
    }else{
        let template = await exporter.loadTemplate('dependencies/singleTemplate.txt');

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

        for(let svg of formattedSVGs.svgs){
            let download = template;

            // filling the template
            download = download.replaceAll('__VIEWBOX-X__', options.viewbox.value.x);
            download = download.replaceAll('__VIEWBOX-Y__', options.viewbox.value.y);
            download = download.replace('__STYLING__', options.minify.input.checked ? vkbeautify.cssmin(svg.style) : vkbeautify.css(svg.style));
            download = download.replace('__GROUPS__', svg.group);
        
            console.log(options.minify.input.checked ? vkbeautify.xmlmin(download) : vkbeautify.xml(download));
            exporter.download(`${svg.name}.svg`, 
                            options.minify.input.checked ? vkbeautify.xmlmin(download) : vkbeautify.xml(download));
        }

        notification.add({type: 'downloadMultiple', data: formattedSVGs.svgs.length});
    }
}

// this function loads the template
exporter.loadTemplate = (template) => {
    return new Promise(resolve => {
        $.ajax({
            url: template,
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
