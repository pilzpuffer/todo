let stackMaker = function() {

    let allColors = ["critical", "high", "medium", "low", "minimal"]

    let noteHolder = document.querySelector("#allTasks");
    let noteWrapper = document.createElement("li");
    noteWrapper.classList.add("wrapper");
    
    for (let i = 0; i < 5; i++) {
        console.log('this is running')
        let note = document.createElement("div");
        note.classList.add("new");
        note.id = i;
        note.classList

        noteWrapper.appendChild(note);  
    }

    noteHolder.appendChild(noteWrapper);
}

export { stackMaker };