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
        filteredArray = array.filter(function (x) {
            return compareArray.indexOf(x) < 0;
        });

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
        note.classList.add("new");
        note.id = i;
        note.style.backgroundColor = `var(--${assignRandomUniqueArrayValue(allColors, presentColors)})`;

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
}

export { stackMaker };