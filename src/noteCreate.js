import pencilImgSource from "./assets/img/pencil-outline.svg"

import { allProjects } from "./trackProjectState.js";
import { editNote } from "./noteEdit.js";
import { formatDistanceToNow } from "date-fns";
import { noteState } from "./noteEdit.js";

let getKeyByValue = function(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let newNote = function(id, title, description, priority, deadline, project, taskComplete) {   
    let noteHolder = document.querySelector("#allTasks");
    let note = document.createElement("li");
    note.classList.add("note");
    let assignProject; 
    let selectedNote;
    let titleText;
    let descriptionText;
    let deadlineData;
    let noteStatus;

    const noteData = noteState.beingEdited ? new FormData(document.querySelector("#taskInfoEdit")) : new FormData(document.querySelector("#taskInfo"))

    if (noteState.beingEdited) {
        selectedNote = document.querySelector("#selectedNoteEdit");
        note.dataset.id = noteState.editedNoteId;
        
        assignProject = JSON.parse(localStorage.getItem(`${note.dataset.id}`)).project;
        titleText = noteData.get("titleEdit").length === 0 ? null : noteData.get("titleEdit");;
        descriptionText = noteData.get("descriptionEdit").length === 0 ? null : noteData.get("descriptionEdit");
        deadlineData = noteData.get("deadlineEdit").length === 0 ? null : noteData.get("deadlineEdit");
        noteStatus = false;
    } else {
        selectedNote = document.querySelector("#selectedNote");
        note.dataset.id = id === undefined? crypto.randomUUID() : id;

        //to find currently open project and assign task that is being created to it:
        assignProject = getKeyByValue(allProjects, true); 
        titleText = noteData.get("title").length === 0 ? null : noteData.get("title");
        descriptionText = noteData.get("description").length === 0 ? null : noteData.get("description");
        deadlineData = noteData.get("deadline").length === 0 ? null : noteData.get("deadline");
        noteStatus = taskComplete === undefined? false : taskComplete;
    }

    let getSelectedColor = priority === undefined ? selectedNote.classList[1] : priority;    
    note.classList.add(getSelectedColor);
    project === undefined? note.classList.add(assignProject) : note.classList.add(project);

    let pin = document.createElement("div");
    pin.classList.add("pin");
    pin.setAttribute('data-tooltip', 'Click to unpin this note');
    pin.addEventListener('click', function() {
        noteHolder.removeChild(note);
        localStorage.removeItem(note.dataset.id);
    })

    let pencilButton = document.createElement("button");
    pencilButton.classList.add('edit');
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

    let updateNoteStatus = function(event) {
        let textNoteId = event.currentTarget.parentNode.parentNode.parentNode.dataset.id;
        let task = JSON.parse(localStorage.getItem(`${textNoteId}`));
        task.taskComplete = !task.taskComplete;
        localStorage.setItem(`${textNoteId}`, JSON.stringify(task));
    }

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = title == null ? titleText : title;
    noteTitle.addEventListener('click', function(event) {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
        updateNoteStatus(event);
    })

    let noteDescription = document.createElement("p");
    noteDescription.textContent = description == null ? descriptionText : description;
    noteDescription.addEventListener('click', function(event) {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
        updateNoteStatus(event);
    })

    textHolder.appendChild(noteTitle);
    textHolder.appendChild(noteDescription);
    noteContent.appendChild(textHolder);

    if ( (deadlineData !== null && deadlineData !== undefined) || (deadline !== null && deadline !== undefined)) {
        let noteDeadline = document.createElement("p");
        noteDeadline.classList.add('noteDeadline');
        let timeDiff;
        if (deadline !== null && deadline !== undefined) {
            timeDiff = formatDistanceToNow(new Date(deadline), {addSuffix: true});
        } 
        
        if (deadlineData !== null && deadlineData !== undefined) {
            timeDiff =  formatDistanceToNow(new Date(deadlineData), {addSuffix: true});
        }
         
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
            title: titleText,
            description: descriptionText,
            priority: getSelectedColor,
            deadline: deadlineData,
            project: assignProject,
            taskComplete: noteStatus,
            type: 'note'
        }

        notePreservationInfo.timestamp = noteState.beingEdited ? JSON.parse(localStorage.getItem(`${noteState.editedNoteId}`)).timestamp : new Date(Date.now());
        localStorage.setItem(`${note.dataset.id}`, JSON.stringify(notePreservationInfo));
        
    }

    noteState.beingEdited ? noteHolder.insertBefore(note, noteHolder.children[noteState.orderOfEdited]) : noteHolder.appendChild(note);  
    if (taskComplete === true) {
        noteDescription.classList.toggle('done');
        noteTitle.classList.toggle('done');
    }
}

export { newNote };