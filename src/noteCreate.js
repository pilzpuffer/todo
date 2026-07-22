import { allProjects } from "./trackProjectState.js";

let getKeyByValue = function(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let newNote = function() {   
    let noteForm = document.querySelector("#taskInfo");

    const noteData = new FormData(noteForm);

    let noteHolder = document.querySelector("#allTasks");
    let getSelectedColor = document.querySelector("#selectedNote").getAttribute('style');
    
    let note = document.createElement("li");
    note.classList.add("note");
    //to find currently open project and assign task that is being created to it:
    note.classList.add(`${getKeyByValue(allProjects, true)}`); 
    note.setAttribute("style", getSelectedColor);

    let pin = document.createElement("div");
    pin.classList.add("pin");
    pin.setAttribute('data-tooltip', 'Click to unpin this note');

    let noteContent = document.createElement("div");
    noteContent.classList.add("noteContent");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = noteData.get("title");

    let noteDescription = document.createElement("p");
    noteDescription.textContent = noteData.get("description");

    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteDescription);

    note.appendChild(pin);
    note.appendChild(noteContent);

    noteHolder.appendChild(note);   
}

export { newNote };