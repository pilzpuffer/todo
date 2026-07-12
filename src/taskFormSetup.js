function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// small letters:
// 9 symbols per title, 14 symbols per text
// big letters:
// 7 symbols per title, 10 symbols per text
//total lines fitting in:
// 0 lines of title = 7 of text
// 1 line of title = 5 of text
// 2 lines of title = 3 text
// 3 lines of title = 2 of text
// 4 lines of title = 0 text

let createEditableInput = function(setName, setID, setPlaceholder, appendTo) {
    let newInput = document.createElement('textarea');
    newInput.setAttribute('name', `${setName}`);
    newInput.setAttribute('id', `${setID}`);
    newInput.setAttribute('placeholder', `${setPlaceholder}`);
    newInput.setAttribute('contenteditable', 'true');
    appendTo.appendChild(newInput);
}

let limitLines = function(lineLimit, limitingContainer, limitedChild) {
    let containerLimits = limitingContainer.getBoundingClientRect();
    let containerStyles = window.getComputedStyle(limitingContainer);
    let containerHeight = parseInt(containerLimits.height);
    
    let childHeight = limitedChild.scrollHeight;
    let childStyles = window.getComputedStyle(limitedChild);
    let childFontSize = childStyles.getPropertyValue("font-size");
    let childLineHeight = parseInt(childStyles.getPropertyValue("line-height"));
    console.log(containerHeight);
    console.log(limitedChild.scrollHeight);
    console.log(childLineHeight);
    console.log(Math.floor(containerHeight/childLineHeight));
    console.log(Math.floor(containerHeight/childLineHeight) > lineLimit);

    if (childHeight > containerHeight && Math.floor(childHeight/childLineHeight) > lineLimit){
        limitedChild.value = limitedChild.value.slice(0, -1);
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

        note.addEventListener('input', function(event) {
            let titleId = document.querySelector("#title")
            limitLines(4, taskForm, titleId)
        })

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
    let mediumNote = document.querySelector(".new.medium");
    mediumNote.click();
}

export { stackMaker };