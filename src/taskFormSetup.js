function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
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

    let noteHolder = document.querySelector("#allTasks");
    let noteWrapper = document.createElement("li");
    noteWrapper.classList.add("wrapper");
    
    for (let i = 0; i < 5; i++) {
        console.log('this is running')
        let note = document.createElement("div");
        let noteColor = `${assignRandomUniqueArrayValue(allColors, presentColors)}`
        note.classList.add("new", noteColor);
        note.style.backgroundColor = `var(--${noteColor})`;
        if (note.classList.contains('medium')) {
            note.id = "selected";
        }
        note.addEventListener("click", function(event) {
            console.log('I was clicked!', `I'm ${note.classList[1]}`);
            if (event.target.id !== 'selected') {
                let allNewNoteColors = document.querySelectorAll(".new");
                allNewNoteColors.forEach((note) => {
                if (note.id === 'selected') {
                    note.removeAttribute('id');
                }

                event.target.id = 'selected';
                })
            }
            
        })

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
}

export { stackMaker };