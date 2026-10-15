import { newNote } from './noteCreate.js'
import { compareAsc } from "date-fns";

//this seems to run in the correct order, but for some reason, newest entries get added first, not last
//checked - entries are not ordered like in an array, so will need a different way to get them
let revive = function() {
    let allNotes = []
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key( i );
        let item = JSON.parse( localStorage.getItem( key ) );
        allNotes.push(item)
    }

    allNotes.sort((a, b) => compareAsc(a.timestamp, b.timestamp)); //sorting in ascending order
    allNotes.forEach((note) => newNote(note.id, note.title, note.description, note.priority, note.deadline, note.project));
}

export { revive }
