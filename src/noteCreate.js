let newNote = function() {
    console.log('yay! this is a new note!')
    
    let noteForm = document.querySelector("#taskInfo");

    const noteData = new FormData(noteForm);

    let noteHolder = document.querySelector("#allTasks");
    
    let note = document.createElement("li");
    note.classList.add("note");
    note.style.backgroundColor = `var(--${noteData.get("priority").toLowerCase()})`;

    let pin = document.createElement("div");
    pin.classList.add("pin");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = noteData.get("title");

    let noteDescription = document.createElement("p");
    noteDescription.textContent = noteData.get("description");

    note.appendChild(pin);
    note.appendChild(noteTitle);
    note.appendChild(noteDescription);

    noteHolder.appendChild(note);
}

export { newNote };