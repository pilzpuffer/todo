import { newNote } from './noteCreate.js'

//this seems to run in the correct order, but for some reason, newest entries get added first, not last
//checked - entries are not ordered like in an array, so will need a different way to get them
let revive = function() {
    console.log(localStorage.length);
    
    for (let i = 0; i < localStorage.length; i++) {
        // let key = localStorage.key( i );
        let item = JSON.parse( localStorage.getItem( i ) );
        console.log(item.title)

        newNote(item.id, item.title, item.description, item.priority, item.project); //item.deadline
    }
}

export { revive }
