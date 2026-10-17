let projectHolder = document.querySelector("#allProjects");

let allProjects = {  }

let getCurrentProject = function(event) {
    if (event.target.id !== 'projectSubmit' && event.target.id !== 'newProject' && !event.target.classList.contains("newProject") && event.target.id.length > 0) {
        let activeProject = event.target.id;
        console.log(activeProject)

        if (activeProject !== 'newProject') {
            allProjects[activeProject] = true;

            Object.keys(allProjects).forEach(key => {
                if (key !== activeProject) {
                    allProjects[key] = false;
                }   
            });

            let allNotes = document.querySelectorAll(".note");
            allNotes.forEach((note) => {
                if (activeProject !== "main" && !note.classList.contains(`${activeProject}`)) {
                    note.classList.add("removed");
                } else {
                    note.classList.remove("removed");
                }
            })
        }  
    }
}

console.log(allProjects);

// let projectPreservationData = {
//             name: activeProject,
//             status: , 
//             type: 'project'
//         }
//         JSON.stringify(notePreservationInfo);
//         localStorage.setItem(`${note.dataset.id}`, JSON.stringify(notePreservationInfo));

//store projects in localstorage as well
projectHolder.addEventListener("click", getCurrentProject)

export { allProjects };