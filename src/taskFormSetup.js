function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

let createInput = function(setName, setID, setPlaceholder, appendTo) {
    let newInput = document.createElement('textarea');
    newInput.setAttribute('name', `${setName}`);
    newInput.setAttribute('id', `${setID}`);
    newInput.setAttribute('placeholder', `${setPlaceholder}`);
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

let childStatus = {
    limitReached: false,
    first: true,
    second: true
}

let limitLines = function(event, lineLimit1, lineLimit2, limitingContainer, limitedChild1, limitedChild2) {
    let containerLimits = limitingContainer.getBoundingClientRect();
    let containerStyles = window.getComputedStyle(limitingContainer);
    let containerHeight = parseInt(containerLimits.height);

    let managedChildren = createManagedLimitedChildren(limitedChild1, limitedChild2)

    let firstCheckHeight = Math.floor(managedChildren.first.height/managedChildren.first.lineHeight());
    let firstChildBigger = managedChildren.first.height > containerHeight;

    let secondCheckHeight = Math.floor(managedChildren.second.height/managedChildren.second.lineHeight());
    let secondChildBigger = managedChildren.second.height > (containerHeight - 20);

    // if (managedChildren.limitReached === true && event.inputType !== 'deleteContentBackward') {
        //checked this more carefully - won't work, as input even happens specifically when input is already DONE, can't cancel/preventDefault it
    // } 

console.log(firstCheckHeight, firstCheckHeight < lineLimit1, childStatus.second)
    
    if (firstCheckHeight < lineLimit1 && childStatus.second === false) {
        if (childStatus.limitReached) {
            childStatus.limitReached = false
        }
        limitedChild2.classList.remove("removed");
        childStatus.second = true
    }

    if (firstCheckHeight === lineLimit1) {
        limitedChild2.classList.add("removed");
        childStatus.second = false
    }

    if (secondCheckHeight < lineLimit2-1 && childStatus.first === false) {
        if (childStatus.limitReached) {
            childStatus.limitReached = false
        }
        limitedChild1.classList.remove("removed");
        childStatus.first = true
    }

    if (secondCheckHeight === lineLimit2-1) {
        limitedChild1.classList.add("removed");
        childStatus.first = false
    }

    if (firstChildBigger && firstCheckHeight > lineLimit1){
        childStatus.limitReached = true;
        limitedChild1.value = limitedChild1.value.slice(0, -1);
        //i need to find some kind of solution for pasted text as well, as this only works for typing scenarios
    }  

    if (secondChildBigger && secondCheckHeight > lineLimit2) {
        childStatus.limitReached = true;
        limitedChild2.value = limitedChild2.value.slice(0, -1);
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

    createInput('title', 'title', 'Add a title', taskForm);
    createInput('description', 'description', 'Add a description', taskForm);

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

        note.addEventListener("keydown", function(event) {
            if (childStatus.limitReached && event.key !== 'Backspace') {
                event.preventDefault()
            }  else if (childStatus.limitReached && event.key === 'Backspace') [
                childStatus.limitReached = false
            ]
            
        })

        note.addEventListener('input', function(event) {
            let titleId = document.querySelector('#title');
            let descriptionId = document.querySelector('#description');
            limitLines(event, 4, 6, taskForm, titleId, descriptionId);
        })

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".new.medium");
    mediumNote.click();
}

export { stackMaker };