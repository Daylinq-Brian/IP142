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
    dropBox.addEventListener('drop', event => {
        event.preventDefault();
        
        dropBox.style.display = 'none';
    });
});