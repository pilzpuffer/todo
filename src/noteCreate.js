import pencilImgSource from "./assets/img/pencil-outline.svg"

import { allProjects } from "./trackProjectState.js";
import { editNote } from "./noteEdit.js";
import { formatDistanceToNow } from "date-fns";
import { noteState } from "./noteEdit.js";

let getKeyByValue = function(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}



let newNote = function(id, title, description, priority, deadline, project) {   
    let noteForm = document.querySelector("#taskInfo");

    const noteData = new FormData(noteForm);

    let noteHolder = document.querySelector("#allTasks");
    let getSelectedColor = priority === undefined ? document.querySelector("#selectedNote").classList[1] : priority;
    
    let note = document.createElement("li");
    note.dataset.id = id === undefined? crypto.randomUUID() : id;
    note.classList.add("note");

    //to find currently open project and assign task that is being created to it:
    if (project === undefined) {
        note.classList.add(`${getKeyByValue(allProjects, true)}`); 
    } else {
        note.classList.add(project); 
    }
    
    note.classList.add(getSelectedColor);

    let pin = document.createElement("div");
    pin.classList.add("pin");
    pin.setAttribute('data-tooltip', 'Click to unpin this note');
    pin.addEventListener('click', function() {
        noteHolder.removeChild(note);
        localStorage.removeItem(note.dataset.id);
    })

    let pencilButton = document.createElement("button");
    pencilButton.id = 'edit';
    let pencilImage = document.createElement("img");
    pencilImage.src = pencilImgSource;
    pencilButton.appendChild(pencilImage);
    pencilButton.setAttribute('data-tooltip', 'Click to edit this note');
    pencilButton.classList.add('removed');
    pencilButton.addEventListener('click', function() {
        noteState.beingEdited ? alert('Please finish editing the previous note first.') : editNote(note);
    });

    let noteContent = document.createElement("div");
    noteContent.classList.add("noteContent");

    let textHolder = document.createElement("div");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = title === undefined ? noteData.get("title") : title;
    noteTitle.addEventListener('click', function() {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
    })

    let noteDescription = document.createElement("p");
    noteDescription.textContent = description === undefined ? noteData.get("description") : description;
    noteDescription.addEventListener('click', function() {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
    })

    textHolder.appendChild(noteTitle);
    textHolder.appendChild(noteDescription);
    noteContent.appendChild(textHolder);

    if (noteData.get('deadline') || deadline !== undefined) {
        let noteDeadline = document.createElement("p");
        noteDeadline.classList.add('noteDeadline');
        let timeDiff = deadline === undefined ? formatDistanceToNow(new Date(noteData.get('deadline')), {addSuffix: true}) : formatDistanceToNow(new Date(deadline), {addSuffix: true});
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

    if (id === undefined) {
        let notePreservationInfo = {
            id: note.dataset.id,
            title: noteData.get("title"),
            description: noteData.get("description"),
            priority: getSelectedColor,
            deadline: noteData.get('deadline'),
            project: getKeyByValue(allProjects, true),
            timestamp: new Date(Date.now())
        }

        JSON.stringify(notePreservationInfo);
        localStorage.setItem(`${note.dataset.id}`, JSON.stringify(notePreservationInfo));
    }

    noteHolder.appendChild(note);  
    //need to add a deadline at creation/for editing, as well as an option to edit note text post-adding
}

export { newNote };