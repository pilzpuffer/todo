import pencilImgSource from "./assets/img/pencil-outline.svg"

import { allProjects } from "./trackProjectState.js";
import { editNote } from "./noteEdit.js";
import { formatDistanceToNow } from "date-fns";

let getKeyByValue = function(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let newNote = function() {   
    let noteForm = document.querySelector("#taskInfo");

    const noteData = new FormData(noteForm);

    let noteHolder = document.querySelector("#allTasks");
    let getSelectedColor = document.querySelector("#selectedNote").getAttribute('style');
    
    let note = document.createElement("li");
    note.dataset.id = crypto.randomUUID();
    console.log(note.dataset.id);
    note.classList.add("note");

    //to find currently open project and assign task that is being created to it:
    note.classList.add(`${getKeyByValue(allProjects, true)}`); 
    note.setAttribute("style", getSelectedColor);

    let pin = document.createElement("div");
    pin.classList.add("pin");
    pin.setAttribute('data-tooltip', 'Click to unpin this note');
    pin.addEventListener('click', function() {
        noteHolder.removeChild(note);
    })

    let pencilButton = document.createElement("button");
    pencilButton.id = 'edit';
    let pencilImage = document.createElement("img");
    pencilImage.src = pencilImgSource;
    pencilButton.appendChild(pencilImage);
    pencilButton.setAttribute('data-tooltip', 'Click to edit this note');
    pencilButton.classList.add('removed');
    pencilButton.addEventListener('click', function(event) {
        editNote(note);
    });

    let noteContent = document.createElement("div");
    noteContent.classList.add("noteContent");

    let textHolder = document.createElement("div");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = noteData.get("title");
    noteTitle.addEventListener('click', function() {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
    })

    let noteDescription = document.createElement("p");
    noteDescription.textContent = noteData.get("description");
    noteDescription.addEventListener('click', function() {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
    })

    textHolder.appendChild(noteTitle);
    textHolder.appendChild(noteDescription);
    noteContent.appendChild(textHolder);

    if (noteData.get('deadline')) {
        let noteDeadline = document.createElement("p");
        noteDeadline.id = 'noteDeadline';
        let timeDiff = formatDistanceToNow(new Date(noteData.get('deadline')), {addSuffix: true});
        noteDeadline.textContent = timeDiff;  
        noteContent.appendChild(noteDeadline);
    }

    note.appendChild(pin);
    note.appendChild(pencilButton);
    note.appendChild(noteContent);

    note.addEventListener('mouseenter', function() {
        pencilButton.classList.remove('removed');
    })

    note.addEventListener('mouseleave', function() {
        pencilButton.classList.add('removed');
    })

    noteHolder.appendChild(note);   
    //need to add a deadline at creation/for editing, as well as an option to edit note text post-adding
}

export { newNote };