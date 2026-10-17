import { newNote } from './noteCreate.js'
import { compareAsc } from "date-fns";
import { newProject } from './projectCreate.js';
import { allProjects } from './trackProjectState.js';

let revive = function() {
    let allNotesRevive = [];
    let allProjectsRevive = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key( i );
        let item = JSON.parse( localStorage.getItem( key ) );
        if (item.type === 'note') {
            allNotesRevive.push(item)
        } else if (item.type === 'project') {
            allProjectsRevive.push(item)
        }
    }

    allNotesRevive.sort((a, b) => compareAsc(a.timestamp, b.timestamp)); //sorting in ascending order
    allProjectsRevive.sort((a, b) => compareAsc(a.timestamp, b.timestamp)); 
    
    allProjectsRevive.forEach((project) => newProject(project.id, project.priority, project.status));
    allProjectsRevive.forEach((project) => allProjects[project.id] = project.status);
    allNotesRevive.forEach((note) => newNote(note.id, note.title, note.description, note.priority, note.deadline, note.project));
}

export { revive }
