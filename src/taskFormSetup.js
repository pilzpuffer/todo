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

// 0 lines of title = 6 of text - handled
// 1 line of title = 4 of text
// 2 lines of title = 3 text
// 3 lines of title = 1 of text
// 4 lines of title = 0 text - handled

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