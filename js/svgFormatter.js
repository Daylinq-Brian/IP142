formattedSVGs = {};
formattedSVGs.svgs = [];

// function for formatting all svg's
formattedSVGs.format = () => {

    for(let file of files.content){

        // testing for css in the svg and then reformatting it and changing classes
        let tempSVGobj = createElementFromHTML(file.content);
        let tempCSS = '';

        // pulling all css and putting it in one string
        if(tempSVGobj.getElementsByTagName('style').length > 0){
            for(let styleElement of tempSVGobj.getElementsByTagName('style')){
                tempCSS += styleElement.innerHTML;
                styleElement.remove();
            }

            // reformatting all css and element class names
            let elementList = tempSVGobj.getElementsByTagName('*');
            let classList = [];

            // storing all classes in an array
            for(let element of elementList){
                if(element.className.baseVal == '') continue;
                if(classList.includes(element.className.baseVal)) continue;
                classList.push(element.className.baseVal);
            }

            // changine element classnames
            for(let i = 0; i < elementList.length; i++){
                if(elementList[i].className.baseVal == '') continue;
                let newClassName = `class_${file.name.slice(0, -4)}_n${classList.indexOf(elementList[i].className.baseVal)}`;
                elementList[i].className.baseVal = newClassName;
            }

            // changing classnames in the css
            for(let i = 0; i < classList.length; i++){
                tempCSS = tempCSS.replaceAll(classList[i], `class_${file.name.slice(0, -4)}_n${i}`);
            }
        }

        // removing all id's
        for(let element of tempSVGobj.getElementsByTagName('*')){
            if(element.id == undefined) continue;
            element.removeAttribute('id');
        }

        // pushing an object with all information to the formatted svg array
        formattedSVGs.svgs.push({
            name: file.name.slice(0, -4), 
            style: tempCSS, 
            group: `\n<g class="SVG-layer" id="${file.name.slice(0, -4)}">\n${tempSVGobj.innerHTML}\n</g>\n`
        });

    }
}

// function to create a dom element from the svg content string
function createElementFromHTML(htmlString){
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.lastChild;
}
