import pinImgSource from './assets/img/pin.svg';
import deadlineAddImgSource from './assets/img/clock-edit.svg';

import { newNote } from "./noteCreate.js";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

let createInput = function(inputType, setName, setID, setPlaceholder, appendTo) {
    let newInput = document.createElement(`${inputType}`);
    newInput.setAttribute('name', `${setName}`);
    newInput.setAttribute('id', `${setID}`);
    if (setPlaceholder.length > 0) {
        newInput.setAttribute('placeholder', `${setPlaceholder}`);
    }
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
        style: window.getComputedStyle(name),
        height() {
            return name.scrollHeight
        }, 
        fontSize(){
            return this.style.getPropertyValue("font-size")
        }, 
        lineHeight(){
            return parseInt(this.style.getPropertyValue("line-height"))
        },
        lineAmount() {
            return Math.floor(this.height()/this.lineHeight())
        }
    }
}

let childStatus = {
    limitReached: false,
    first: true,
    second: true
}

let validateTaskForm = function() {
    let titleLength = document.forms["taskInfo"]["title"].value.length;
    let descriptionLength = document.forms["taskInfo"]["description"].value.length;

    if (descriptionLength === 0 && titleLength === 0) {
        alert("Please write something on this new note.");
        return false
    } else {
        return true
    }
}

let limitLines = function(event, lineLimit1, lineLimit2, limitingContainer, limitedChild1, limitedChild2) {
    let containerLimits = limitingContainer.getBoundingClientRect();
    let containerStyles = window.getComputedStyle(limitingContainer);
    let containerHeight = parseInt(containerLimits.height);

    let managedChildren = createManagedLimitedChildren(limitedChild1, limitedChild2)

    let firstChildBigger = managedChildren.first.height() > containerHeight;
    let secondChildBigger = managedChildren.second.height() > (containerHeight - 20);
    
    let totalHeight = managedChildren.first.height() + managedChildren.second.height();
    let checkTotalLines = Math.floor(managedChildren.first.lineAmount() + managedChildren.second.lineAmount())
   
    let totalLimit;

    //not limited by a specific block size, I just think that this amount looks the best visually:
    if (managedChildren.first.lineAmount() <= 4) {
        totalLimit = 4
    } else {
        totalLimit = 5
    }

    let manageTextSectionVisibility = function() {
        //adjust visibility rules for this scenario: desc goes over limit, we delete some text for title to reappear - currently, we can only type 1 symbol, and then it's considered to be 'over limit'
        if (!childStatus.second && managedChildren.first.lineAmount() < lineLimit1) {
            if (childStatus.limitReached) {
                childStatus.limitReached = false
            }
            limitedChild2.classList.remove("removed");
            childStatus.second = true
        }

        if (childStatus.second && limitedChild2.value.length === 0 && managedChildren.first.lineAmount() === lineLimit1) {
            limitedChild2.classList.add("removed");
            childStatus.second = false
        }

        if (!childStatus.first && managedChildren.second.lineAmount() < lineLimit2-1) {
            if (childStatus.limitReached) {
                childStatus.limitReached = false
            }
            limitedChild1.classList.remove("removed");
            childStatus.first = true
        }

        if (childStatus.first && limitedChild1.value.length === 0 && managedChildren.second.lineAmount() >= lineLimit2-1) {
            limitedChild1.classList.add("removed");
            childStatus.first = false
        }
    }

    manageTextSectionVisibility()

    if (firstChildBigger && managedChildren.first.lineAmount() > lineLimit1){   
        childStatus.limitReached = true;
        limitedChild1.value = limitedChild1.value.slice(0, -1);
    } else if (secondChildBigger && managedChildren.second.lineAmount() > lineLimit2) {
        childStatus.limitReached = true;
        limitedChild2.value = limitedChild2.value.slice(0, -1);
    } else if (limitedChild1.value.length > 0 && limitedChild2.value.length > 0 && checkTotalLines > totalLimit) {
        childStatus.limitReached = true;
        limitedChild2.value = limitedChild2.value.slice(0, -1);
    }

    if (event.inputType === 'insertFromPaste') {
        limitedChild1.value = limitedChild1.value.slice(0, 100);
        limitedChild1.value = limitedChild1.value.slice(0, 230);
        
        while (managedChildren.first.lineAmount() > lineLimit1) {
            limitedChild1.value = limitedChild1.value.slice(0, -1);
        } 

        while (managedChildren.second.lineAmount() > lineLimit2) {
            limitedChild2.value = limitedChild2.value.slice(0, -1);
        } 

        manageTextSectionVisibility();
    }
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

    return select
}

let createTaskForm = function() {
    let allNoteColors = ["critical", "high", "medium", "low", "minimal"];
    let presentColors = [];

    let taskForm = document.createElement("form");
    taskForm.classList.add('form');
    taskForm.id = 'taskInfo';
    taskForm.setAttribute('method', 'post');

    createInput('textarea', 'title', 'title', 'Add a title', taskForm);
    createInput('textarea', 'description', 'description', 'Add a description', taskForm);
    createInput('datetime-local', 'setDeadline', 'setDeadline', '', taskForm)

    let noteHolder = document.querySelector("#allTasks");
    let noteWrapper = document.createElement("li");
    noteWrapper.classList.add("wrapper");

    let pinButton = document.createElement("button");
    pinButton.id = 'taskSubmit';
    let pinImage = document.createElement("img")
    pinImage.src = pinImgSource;
    pinButton.appendChild(pinImage)
    pinButton.setAttribute('type', 'submit');
    pinButton.setAttribute('data-tooltip', 'Click to pin a new note');

    let clockButton = document.createElement("button");
    clockButton.id = 'giveDeadline';
    let clockImage = document.createElement("img");
    clockImage.src = deadlineAddImgSource;
    clockButton.appendChild(clockImage);
    clockButton.setAttribute('data-tooltip', 'Click to set a deadline');

    pinButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (validateTaskForm()) {
            newNote();
            clockButton.classList.remove('hidden');
            // calendar.classList.add('removed');
            taskForm.reset();
        }
    })

    clockButton.addEventListener('click', function(event) {
        clockButton.classList.add('removed');
        // calendar.classList.remove('removed');
    })

    for (let i = 0; i < 5; i++) {
        let note = document.createElement("div");
        let noteColor = `${assignRandomUniqueArrayValue(allNoteColors, presentColors)}`
        note.classList.add("newNote", noteColor);
        note.style.backgroundColor = `var(--${noteColor})`;

        note.addEventListener("click", function(event) {
            if (event.target.classList[0] === 'newNote' && event.target.id !== 'selectedNote') {
                let allNewNoteColors = document.querySelectorAll(".newNote");
                allNewNoteColors.forEach((note) => {
                if (note.id === 'selectedNote') {
                    let currentlySelected = document.querySelector('#selectedNote');
                    currentlySelected.removeChild(taskForm);
                    currentlySelected.removeAttribute('id'); 
                }
                })
                event.target.id = 'selectedNote';
                event.target.appendChild(pinButton);
                event.target.appendChild(taskForm);  
                event.target.appendChild(clockButton);  
            }
            
        })

        let allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace'];

        note.addEventListener("keydown", function(event) {
            if (childStatus.limitReached && ((!event.ctrlKey && event.code !== "KeyA") && (!allowedKeys.includes(event.code)))) {
                event.preventDefault()
            }  else if (childStatus.limitReached && event.key === 'Backspace') {
                childStatus.limitReached = false
            }          
        })

        note.addEventListener('input', function(event) {
            let titleId = document.querySelector('#title');
            let descriptionId = document.querySelector('#description');
            limitLines(event, 4, 6, taskForm, titleId, descriptionId);
        })

        note.addEventListener('paste', function(event) {
            if (childStatus.limitReached) {
                event.preventDefault()
            } 
        })

        noteWrapper.appendChild(note); 
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".newNote.medium");
    mediumNote.click();
    //add deadline setting
}

export { createTaskForm, createInput, assignRandomUniqueArrayValue };