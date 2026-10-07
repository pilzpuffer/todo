import { newNote } from './noteCreate.js'

let allNotes = []

//this seems to run in the correct order, but for some reason, newest entries get added first, not last
//checked - entries are not ordered like in an array, so will need a different way to get them
let revive = function() {
    console.log(localStorage.length);
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key( i );
        let item = JSON.parse( localStorage.getItem( key ) );
        allNotes.push(item)
        console.log(allNotes);
    }

    allNotes.sort((a, b) => a.order - b.order);
    console.log(allNotes)
    allNotes.forEach((note) => newNote(note.id, note.title, note.description, note.priority, note.project)); //item.deadline

}

export { revive }
