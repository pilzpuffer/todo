let newNote = function() {
    console.log('yay! this is a new note!')
    
    let noteData = document.querySelector("#taskInfo");

    const data = new FormData(noteData);

    let noteHolder = document.querySelector("#allTasks");
    
    let note = document.createElement("li");
    note.classList.add("note");
    note.style.backgroundColor = `var(--${data.get("priority").toLowerCase()})`;

    let pin = document.createElement("div");
    pin.classList.add("pin");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = data.get("title");

    let noteDescription = document.createElement("p");
    noteDescription.textContent = data.get("description");

    note.appendChild(pin);
    note.appendChild(noteTitle);
    note.appendChild(noteDescription);

    noteHolder.appendChild(note);
}

export { newNote };