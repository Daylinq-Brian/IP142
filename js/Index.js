$(document).ready(function (){

    // making the export button functional
    document.getElementById('export-button').addEventListener('click', () =>{
        // calling to format the svg's
        formattedSVGs.format();

        // exporting the file
        exporter.makeFile();
    });
});