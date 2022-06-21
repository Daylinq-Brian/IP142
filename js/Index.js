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
        for (let file of document.getElementById('file-input').files){
            if(!files.content.some(object => object.name == file.name.replaceAll(' ', '_'))){
                files.content.push({
                    name: file.name.replaceAll(' ', '_'), 
                    content: await files.read(file)
                });
            }
    
            updateAmount();
            displayList();
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