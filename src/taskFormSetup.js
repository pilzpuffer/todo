function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

let createEditableInput = function(setName, setID, setPlaceholder, appendTo) {
    let newInput = document.createElement('textarea');
    newInput.setAttribute('name', `${setName}`);
    newInput.setAttribute('id', `${setID}`);
    newInput.setAttribute('placeholder', `${setPlaceholder}`);
    newInput.setAttribute('contenteditable', 'true');
    appendTo.appendChild(newInput);
}

let assignRandomUniqueArrayValue = function(array, compareArray) {
    let select;
    let filteredArray;

    if (compareArray.length === 0) {
        select = array[getRandomNumber(array.length)];
        compareArray.push(select);
    } else {
        filteredArray = array.filter( (x) => !compareArray.includes(x) );

        select = filteredArray[getRandomNumber(filteredArray.length)];
        compareArray.push(select);
    }

    console.log(select, array, compareArray, filteredArray);
    return select
}

let stackMaker = function() {
    let allColors = ["critical", "high", "medium", "low", "minimal"];
    let presentColors = [];

    //  <dialog id="taskOpen">
    //     <button id="taskClose"><img src="./assets/img/plus.svg"></button>

    //     <form id="taskInfo">
    //         <div>
    //             <label for="title">Task title:</label>
    //             <input name="title" id="title" maxlength="28">
    //         </div>

    //         <div>
    //             <label for="description">Task description:</label>
    //             <input name="description" id="description">
    //         </div>

    //         <div>
    //             <label for="priority">Priority</label>
    //                 <select name="priority" id="priority">
    //                         <option>Critical</option>
    //                         <option>High</option>
    //                         <option selected>Medium</option>
    //                         <option>Low</option>
    //                         <option>Minimal</option>
    //                 </select>
    //         </div>

    //         <div> 
    //             <label for="due">Due</label>
    //             <input type="datetime-local" name="due" id="due">
    //         </div>

    //         <button id="taskSubmit" type="submit" value="Pin"><img src="./assets/img/pin.svg">Pin</button>
    //     </form>
    // </dialog>

    let taskForm = document.createElement("form");
    taskForm.classList.add('form');
    taskForm.id = 'taskInfo';
    taskForm.setAttribute('method', 'post');

    createEditableInput('title', 'title', 'Add a title', taskForm);
    createEditableInput('description', 'description', 'Add a description', taskForm);

    let noteHolder = document.querySelector("#allTasks");
    let noteWrapper = document.createElement("li");
    noteWrapper.classList.add("wrapper");
    
    for (let i = 0; i < 5; i++) {
        let note = document.createElement("div");
        let noteColor = `${assignRandomUniqueArrayValue(allColors, presentColors)}`
        note.classList.add("new", noteColor);
        note.style.backgroundColor = `var(--${noteColor})`;

        note.addEventListener("click", function(event) {
            console.log(event);
            if (event.target.classList[0] === 'new' && event.target.id !== 'selected') {
                let allNewNoteColors = document.querySelectorAll(".new");
                allNewNoteColors.forEach((note) => {
                if (note.id === 'selected') {
                    let currentlySelected = document.querySelector('#selected');
                    currentlySelected.removeChild(taskForm);
                    currentlySelected.removeAttribute('id'); 
                }
                })
                event.target.id = 'selected';
                event.target.appendChild(taskForm);
            }
            
        })

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".new.medium");
    mediumNote.click();
}

export { stackMaker };