let projectHolder = document.querySelector("#allProjects");

let allProjects = {  }

let getCurrentProject = function(event) {
    let activeProject = event.target.id;
    console.log(event.target)

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

projectHolder.addEventListener("click", getCurrentProject)

export { allProjects };