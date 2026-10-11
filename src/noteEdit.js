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
    noteState['beingEdited'] = true;

    let noteID = editedNote.dataset.id;
    let currentNoteDOM = document.querySelector(`[data-id="${noteID}"]`);
    let currentNote = JSON.parse(localStorage.getItem(noteID));
    if (currentNote.deadline !== undefined) noteState.hasDeadline = true

    //manage through localStorage!!!!!!!!!!!!
    //assign the priority key as the currently selected edit note in the form (instead of 'medium' as default)
    let noteHolder = document.querySelector("#allTasks");
    
    console.log(elementOrder(noteHolder, currentNoteDOM))
    console.log(noteHolder.children);
    let rightOrder = elementOrder(noteHolder, currentNoteDOM);
    console.log(rightOrder)
    currentNoteDOM.remove();
    
    createTaskForm(rightOrder);
    let editedNoteAssignPriority = document.querySelector(`.editedNote.${currentNote.priority}`);
    editedNoteAssignPriority.click();

    document.forms["taskInfoEdit"]["titleEdit"].value = currentNote.title;
    document.forms["taskInfoEdit"]["descriptionEdit"].value = currentNote.description;
    console.log(document.forms["taskInfoEdit"]["deadlineEdit"].value);
    if (document.forms["taskInfoEdit"]["deadlineEdit"].value > 0) {
        document.forms["taskInfoEdit"]["deadlineEdit"].value = currentNote.deadline;
    }
    
}

export { editNote, noteState }