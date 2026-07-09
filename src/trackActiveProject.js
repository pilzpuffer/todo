let projectHolder = document.querySelector("#allProjects");

let allProjects = {  }

let getCurrentProject = function(event) {
    let activeProject = event.target.id; 
    allProjects[event.target.id] = true;
    Object.keys(allProjects).forEach(key => {
        if (key !== activeProject) {
            allProjects[key] = false;
        }   
    });
    console.log(allProjects);
}

projectHolder.addEventListener("click", getCurrentProject)

export { allProjects };