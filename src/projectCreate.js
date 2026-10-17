import { allProjects } from "./trackProjectState.js";

let newProject = function(id, priority, status) {
    let projectForm = document.querySelector("#projectInfo");
    const projectData = new FormData(projectForm);

    let projectPriority = priority === undefined? `${document.querySelector("#selectedProject").classList[1]}` : priority;
    projectData.set("projectPriority", projectPriority);

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.name = "project";
    let projectTitle = id === undefined? `${projectData.get("projectTitle").toLowerCase()}` : id;
    newInput.id = projectTitle;
    newInput.value = projectTitle;

    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", projectTitle)
    newLabel.classList.add(projectPriority)
    newLabel.textContent = projectTitle;
    newLabel.addEventListener("click", function(event) {
        event.stopPropagation();
    })

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(newLabel);

    let currentStatus = status === undefined? false : status;

    if (id === undefined) {
        let projectPreservationInfo = {
            id: projectTitle,
            priority: projectPriority,
            type: 'project',
            timestamp: new Date(Date.now()),
            status: currentStatus
        }

        localStorage.setItem(`${projectTitle}`, JSON.stringify(projectPreservationInfo));
    } else {
        if (status === true) {
            newInput.click()
        }
    }
}

export { newProject };