import pinImgSource from './assets/img/pin.svg';
import deadlineAddImgSource from './assets/img/clock-plus.svg';

import { createTaskForm } from "./taskFormSetup.js";

let noteState = {
    beingEdited: false,
    hasDeadline: false
}

let elementOrder = function(parentElement, childToFind) {
    return [].indexOf.call(parentElement.children, childToFind);
}

let editNote = function(editedNote) {
    noteState.beingEdited = true;

    let noteID = editedNote.dataset.id;
    noteState.editedNoteId = noteID;;
    let currentNoteDOM = document.querySelector(`[data-id="${noteID}"]`);
    let currentNote = JSON.parse(localStorage.getItem(noteID));
    if (currentNote.deadline !== undefined) noteState.hasDeadline = true

    let noteHolder = document.querySelector("#allTasks");
    let rightOrder = elementOrder(noteHolder, currentNoteDOM);
    noteState.orderOfEdited = rightOrder;
    currentNoteDOM.remove();
    
    createTaskForm(rightOrder); 
    let editedNoteAssignPriority = document.querySelector(`.editedNote.${currentNote.priority}`);
    editedNoteAssignPriority.click();

    document.forms["taskInfoEdit"]["titleEdit"].value = currentNote.title;
    document.forms["taskInfoEdit"]["descriptionEdit"].value = currentNote.description;
    if (currentNote.deadline !== (undefined||null)) {
        document.forms["taskInfoEdit"]["deadlineEdit"].value = currentNote.deadline;
    }
    
}

export { editNote, noteState }