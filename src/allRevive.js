import { newNote } from './noteCreate.js'
import { compareAsc } from "date-fns";
import { newProject } from './projectCreate.js';
import { getKeyByValue } from "./noteCreate.js";

let revive = function() {
    let allNotes = [];
    let allProjects = [];
    let activeProject;
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key( i );
        let item = JSON.parse( localStorage.getItem( key ) );
        if (item.type === 'note') {
            allNotes.push(item)
        } else if (item.type === 'project') {
            allProjects.push(item)
        }
    }

    allNotes.sort((a, b) => compareAsc(a.timestamp, b.timestamp)); //sorting in ascending order
    allProjects.sort((a, b) => compareAsc(a.timestamp, b.timestamp)); 
    
    allProjects.forEach((project) => {
        newProject(project.id, project.priority, project.status)
        if (project.status === true) {
            activeProject = project.id;
        }
    });
    allNotes.forEach((note) => newNote(note.id, note.title, note.description, note.priority, note.deadline, note.project));
    document.querySelector(`#${activeProject}`).click();
}

export { revive }
