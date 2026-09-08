import pinImgSource from './assets/img/pin.svg';
import deadlineAddImgSource from './assets/img/clock-plus.svg';

import { createInput, assignRandomUniqueArrayValue, getRandomNumber, createManagedLimitedChildren, createChild, validateTaskForm, limitLines } from "./taskFormSetup.js";

let editNote = function(editedNote) {
    console.log(editedNote);
    let noteID = editedNote.dataset.id;
    console.log('meow')

    let noteTitle = document.querySelector(`[data-id="${noteID}"] div.noteContent div h2`)
    let noteDescription = document.querySelector(`[data-id="${noteID}"] div.noteContent div p`)
    console.log(noteTitle)
    console.log(noteDescription.value);

    // noteTitle.setAttribute('contenteditable', true);
    // noteDescription.setAttribute('contenteditable', true);
    // noteTitle.textContent = 'meaowww';
    // noteDescription.textContent = 'mrr';

}

export { editNote }