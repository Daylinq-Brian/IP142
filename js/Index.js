$(document).ready(function (){

    // making the export button functional
    document.getElementById('export-button').addEventListener('click', () => {
        // calling to format the svg's
        formattedSVGs.format();

        // exporting the file
        exporter.makeFile();
    });

    // making the upload button functional
    document.getElementById('file-input').addEventListener('change', async() => {

        let JSanimated = 0;
        
        for (let file of document.getElementById('file-input').files){
            if(new RegExp("^.*\.(svg)$").test(file.name)){
                let svg = await files.read(file);

                if(svg.includes('<![CDATA[')){
                    JSanimated++;
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
    });

    // making the better looking upload button fire the ugly html one
    document.getElementById('file-input-button').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });
});

// making the number in the export button update
function updateAmount(){
    document.getElementById('header-svg-amount').innerHTML = files.content.length;
}