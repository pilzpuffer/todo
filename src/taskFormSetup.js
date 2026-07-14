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

function createManagedLimitedChildren(firstChild, secondChild) {
    return {
        first: createChild(firstChild),
        second: createChild(secondChild)
    }
}

function createChild(name) {
    return {
        status: true,
        height: name.scrollHeight,
        style: window.getComputedStyle(name),
        fontSize(){
            return this.style.getPropertyValue("font-size")
        }, 
        lineHeight(){
            return parseInt(this.style.getPropertyValue("line-height"))
        },
    }
}

let limitLines = function(event, lineLimit1, lineLimit2, limitingContainer, limitedChild1, limitedChild2) {
    let containerLimits = limitingContainer.getBoundingClientRect();
    let containerStyles = window.getComputedStyle(limitingContainer);
    let containerHeight = parseInt(containerLimits.height);

    console.log(event)

    let managedChildren = createManagedLimitedChildren(limitedChild1, limitedChild2)

    let checkHeight = Math.floor(managedChildren.first.height/managedChildren.first.lineHeight());
    let childBigger = managedChildren.first.height > containerHeight;

    // if (managedChildren.limitReached === true && event.inputType !== 'deleteContentBackward') {
        //checked this more carefully - need to create a separate keydown listener, as input even happens specifically when input is already DONE, can't cancel/preventDefault it
    // } 

    if (checkHeight === lineLimit1) {
        limitedChild2.classList.add("removed");
        managedChildren.second.status = false
    }

    if (childBigger && checkHeight > lineLimit1){
        managedChildren.limitReached = true;
        limitedChild1.value = limitedChild1.value.slice(0, -1);
        //i need to find some kind of solution for pasted text as well, as this only works for typing scenarios
    }  
}

// let managedChildren;

// let limitLines = function(event, lineLimit1, lineLimit2, limitingContainer, childManager, limitedChild1, limitedChild2) {
//     let containerLimits = limitingContainer.getBoundingClientRect();
//     let containerStyles = window.getComputedStyle(limitingContainer);
//     let containerHeight = parseInt(containerLimits.height);

//     console.log(event)

//     let checkHeight = Math.floor(childManager.first.height/managedChildren.first.lineHeight());
//     let childBigger = childManager.first.height > containerHeight;

//     if (childManager.limitReached === true && event.code !== 'Backspace') {
//         event.preventDefault()
//     } 

//     if (checkHeight === lineLimit1) {
//         limitedChild2.classList.add("removed");
//         childManager.second.status === false
//     }

//     if (childBigger && checkHeight > lineLimit1){
//         childManager.limitReached = true;
//         limitedChild1.value = limitedChild1.value.slice(0, -1); 
//         //i need to find some kind of solution for pasted text as well, as this only works for typing scenarios
//     }  
// }

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

        note.addEventListener('input', function(event) {
            // managedChildren = createManagedLimitedChildren(titleId, descriptionId)
            let titleId = document.querySelector('#title');
            let descriptionId = document.querySelector('#description');
            limitLines(event, 4, 7, taskForm, titleId, descriptionId);
        })

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".new.medium");
    mediumNote.click();
}

export { stackMaker };