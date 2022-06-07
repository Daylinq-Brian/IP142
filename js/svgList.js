$(document).ready(function (){
    // renaming all files
    document.getElementById('rename-button').addEventListener('click', () => {
        // calling the list element
        let list = document.getElementById('svg-list');

        //calling all list items and looping trough
        let listItems = list.childNodes;
        for(let listItem of listItems){
            // getting svg id
            let svgId = parseInt(listItem.id.slice(4));

            // changing the name in the files array
            if(listItem.getElementsByTagName('input')[0].value != ''){
                files.content[svgId].name = (`${listItem.getElementsByTagName('input')[0].value}.svg`).replaceAll(' ', '_');
            }
        }

        // showing the new list
        displayList();
    });
});

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

        // creating list svg preview
        let listSVGpreview = document.createElement('div');
        listSVGpreview.className = 'svg-list-item-preview';
        listSVGpreview.innerHTML = file.content;

        // creating list name box
        let listSVGname = document.createElement('div');
        listSVGname.className = 'svg-list-item-name';

        // making an input
        let listSVGnameInput = document.createElement('input');
        listSVGnameInput.type = 'text';

        // name container
        let listSVGnameContainer = document.createElement('div');
        listSVGnameContainer.className = 'svg-list-item-name-container';
        listSVGnameContainer.innerHTML = file.name.slice(0, -4);

        // appending the input and name
        listSVGname.append(listSVGnameInput);
        listSVGname.append(listSVGnameContainer);

        // making the delete button
        let listSVGdeleteButton = document.createElement('button');
        listSVGdeleteButton.className = 'svg-list-item-button';
        listSVGdeleteButton.innerHTML = 'delete SVG';
        listSVGdeleteButton.addEventListener('click', () => {
            files.content.splice([files.content.indexOf(file)], 1);
            displayList();
        });

        // appending all list item elements
        listItem.append(listSVGpreview);
        listItem.append(listSVGname);
        listItem.append(listSVGdeleteButton);

        list.append(listItem);
    }
}
