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
            if(new RegExp("^.*\.(svg)$").test(file.name)){
                files.content.push({
                    name: file.name.replaceAll(' ', '_'),
                    content: await files.read(file)
                });
            }
        }
    
        displayList();
    });
});