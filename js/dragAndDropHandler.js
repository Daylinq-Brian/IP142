$(document).ready(function (){
    
    let dropBox = document.getElementById('file-drop-box');

    // on file hover show the drop box
    document.getElementById('body').addEventListener('dragenter', event => {
        dropBox.style.display = 'block';
    });

    // when there is no longer a file hovering hide the drop box
    dropBox.addEventListener('dragleave', event => {
        dropBox.style.display = 'none';
    });

    // disabling drageover to enable drop event
    dropBox.addEventListener('dragover', event => {
        event.preventDefault();
    });

    // when a file is dropped (or multiple) close the box and add the files content to an array
    dropBox.addEventListener('drop', async(event) => {
        event.preventDefault();

        let JSanimated = 0;
        let layered = 0;
        
        dropBox.style.display = 'none';

        for(let file of event.dataTransfer.files){
            if(new RegExp("^.*\.(svg)$").test(file.name)){
                let svg = await files.read(file);

                if(svg.includes('<![CDATA[')){
                    JSanimated++;
                    continue;
                }

                if(svg.includes('SVGlayered')){
                    layered++;
                    continue;
                }
                
                if(!files.content.some(object => object.name == file.name.replaceAll(' ', '_'))){
                    files.content.push({
                        name: file.name.replaceAll(' ', '_'), 
                        content: svg
                    });
                }
            }
            updateAmount();
            displayList();
        }

        if(JSanimated > 0){
            notification.add({type: 'animated', data: JSanimated});
            JSanimated = 0; 
        }

        if(layered > 0){
            notification.add({type: 'layered', data: layered});
            layered = 0; 
        }
    });
});