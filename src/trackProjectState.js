let projectHolder = document.querySelector("#allProjects");

let allProjects = {  }

let getCurrentProject = function(event) {
    if (event.target.tagName === 'INPUT' && (event.target.id !== 'projectSubmit' && event.target.id !== 'newProject' && !event.target.classList.contains("newProject") && event.target.id.length > 0)) {
        let activeProject = event.target.id;

        if (activeProject !== 'newProject') {
            allProjects[activeProject] = true;

            Object.keys(allProjects).forEach(key => {
                let currentKey = JSON.parse(localStorage.getItem(key))
                if (key !== activeProject) {
                    allProjects[key] = false;
                    currentKey.status = false;
                    
                } else {
                    currentKey.status = true;
                } 
                localStorage.setItem(`${key}`, JSON.stringify(currentKey));
                
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

projectHolder.addEventListener("click", getCurrentProject)

export { allProjects };