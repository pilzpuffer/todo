import pinImgSource from './assets/img/pin.svg';

import { newNote } from "./noteCreate.js";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

let createInput = function(inputType, setName, setID, setPlaceholder, appendTo) {
    let newInput = document.createElement(`${inputType}`);
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

    let firstLinesAmount = Math.floor(managedChildren.first.height/managedChildren.first.lineHeight());
    let firstChildBigger = managedChildren.first.height > containerHeight;

    let secondLinesAmount = Math.floor(managedChildren.second.height/managedChildren.second.lineHeight());
    let secondChildBigger = managedChildren.second.height > (containerHeight - 20);
    
    let totalHeight = managedChildren.first.height + managedChildren.second.height;
    let checkTotalLines = Math.floor(firstLinesAmount + secondLinesAmount)
   
    let totalLimit;

    //not limited by a specific block size, I just think that this amount looks the best visually:
    if (firstLinesAmount === 3 || firstLinesAmount === 4) {
        totalLimit = 4
    } else {
        totalLimit = 5
    }

    if (!childStatus.second && firstLinesAmount < lineLimit1) {
        if (childStatus.limitReached) {
            childStatus.limitReached = false
        }
        limitedChild2.classList.remove("removed");
        childStatus.second = true
    }

    if (childStatus.second && limitedChild2.value.length === 0 && firstLinesAmount === lineLimit1) {
        console.log('text hidden')
        limitedChild2.classList.add("removed");
        childStatus.second = false
    }

    if (!childStatus.first && secondLinesAmount < lineLimit2-1) {
        if (childStatus.limitReached) {
            childStatus.limitReached = false
        }
        limitedChild1.classList.remove("removed");
        childStatus.first = true
    }

    if (childStatus.first && limitedChild1.value.length === 0 && secondLinesAmount === lineLimit2-1) {
        console.log('title hidden')
        limitedChild1.classList.add("removed");
        childStatus.first = false
    }

    if (firstChildBigger && firstLinesAmount > lineLimit1){
        childStatus.limitReached = true;
        limitedChild1.value = limitedChild1.value.slice(0, -1);
        //i need to find some kind of solution for pasted text as well, as this only works for typing scenarios - will need to handle that through paste event listener
    } else if (secondChildBigger && secondLinesAmount > lineLimit2) {
        childStatus.limitReached = true;
        limitedChild2.value = limitedChild2.value.slice(0, -1);
    } else if (limitedChild1.value.length > 0 && limitedChild2.value.length > 0 && checkTotalLines > totalLimit) {
        console.log('children total limit ran')
        childStatus.limitReached = true;
        limitedChild2.value = limitedChild2.value.slice(0, -1);
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

    pinButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (validateTaskForm()) {
            newNote();
            taskForm.reset();
        }
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
            }
            
        })

        note.addEventListener("keydown", function(event) {
            if (childStatus.limitReached && event.key !== 'Backspace') {
                //need to add a listener for Ctrl+A as well, to allow to select and delete everything through keyboard
                event.preventDefault()
            }  else if (childStatus.limitReached && event.key === 'Backspace') [
                childStatus.limitReached = false
            ]
            
        })

        //need to add an event listener for pasting to manage the amount of present text

        note.addEventListener('input', function(event) {
            let titleId = document.querySelector('#title');
            let descriptionId = document.querySelector('#description');
            limitLines(event, 4, 6, taskForm, titleId, descriptionId);
        })

        noteWrapper.appendChild(note); 
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".newNote.medium");
    mediumNote.click();
}

export { createTaskForm, createInput, assignRandomUniqueArrayValue };