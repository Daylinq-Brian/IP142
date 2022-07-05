// displaying all svg's in the list
function displayList(){
    // calling the list element
    let list = document.getElementById('svg-list');

    // emptying the old list
    list.innerHTML = '';

    for(let file of files.content){
        let listItem = document.createElement('div');
        listItem.className = 'svg-list-item';
        listItem.id = `svg_${files.content.indexOf(file)}`;

        // making the delete button
        let listSVGdeleteButton = document.createElement('div');
        listSVGdeleteButton.className = 'svg-list-item-button';
        listSVGdeleteButton.innerHTML = 'X';
        listSVGdeleteButton.addEventListener('click', () => {
            files.content.splice([files.content.indexOf(file)], 1);
            updateAmount();
            displayList();
        });

        // creating list svg preview
        let listSVGpreview = document.createElement('div');
        listSVGpreview.className = 'svg-list-item-preview';
        listSVGpreview.append(listSVGdeleteButton);

        let listSVGimg = document.createElement('img');
        listSVGimg.src = `data:image/svg+xml;base64,${window.btoa(file.content)}`;
        listSVGpreview.append(listSVGimg);
        // listSVGpreview.innerHTML += file.content;

        // creating list name box
        let listSVGname = document.createElement('div');
        listSVGname.className = 'svg-list-item-name';

        // name container
        let listSVGnameContainer = document.createElement('div');
        listSVGnameContainer.className = 'svg-list-item-name-container';
        listSVGnameContainer.contentEditable = true;
        listSVGnameContainer.innerHTML = file.name.slice(0, -4);

        // adding event listener to the input
        listSVGnameContainer.addEventListener('input', () => {
            file.name = `${listSVGnameContainer.innerHTML}.svg`;
        });

        // appending the name
        listSVGname.append(listSVGnameContainer);

        // appending all list item elements
        listItem.append(listSVGpreview);
        listItem.append(listSVGname);

        list.append(listItem);
    }
}
