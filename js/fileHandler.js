// creating an object for the files construct
let files = {};
files.content = [];

//function to unpack svg's into file content array
files.read = (file) => {
    return new Promise(resolve => {
        let reader = new FileReader()

        reader.onload = (event) => {
            if(event.target.readyState != 2) return;
            resolve(event.target.result);
        }

        reader.readAsText(file);
    })
}