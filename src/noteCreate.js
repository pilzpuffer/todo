let newNote = function() {
    let noteHolder = document.querySelector("#allTasks");
    
    let note = document.createElement("li");
    note.classList.add("note");

    let pin = document.createElement("div");
    pin.classList.add("pin");

    let noteTitle = document.createElement("h2");
    noteTitle.textContent = 'testTitle';

    let noteDescription = document.createElement("p");
    noteDescription.textContent = 'testDesc';

    note.appendChild(pin);
    note.appendChild(noteTitle);
    note.appendChild(noteDescription);

    noteHolder.appendChild(note);
}

export { newNote };