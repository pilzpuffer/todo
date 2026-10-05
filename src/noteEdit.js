import pinImgSource from './assets/img/pin.svg';
import deadlineAddImgSource from './assets/img/clock-plus.svg';

import { createTaskForm } from "./taskFormSetup.js";

let noteState = {
    beingEdited: false
}

let editNote = function(editedNote) {
    console.log(editedNote);
    let noteID = editedNote.dataset.id;
    let notePriority = editedNote.classList[2]; //assign this as the currently selected edit note
    let currentNote = document.querySelector(`[data-id="${noteID}"]`);
    noteState.editedNotePriority = notePriority;
    console.log(noteState)
    // let noteTitle = document.querySelector(`[data-id="${noteID}"] div.noteContent div h2`)
    // let noteDescription = document.querySelector(`[data-id="${noteID}"] div.noteContent div p`)
    // console.log(noteTitle)
    // console.log(noteDescription.value);

    //will need to manage tis through createTaskForm function, it needs adjustments

    currentNote.replaceWith(createTaskForm());
    noteState['beingEdited'] = true;

}

export { editNote, noteState }