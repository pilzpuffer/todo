let newProject = function() {
    let projectForm = document.querySelector("#projectInfo");
    const projectData = new FormData(projectForm);

    let projectPriority = `${document.querySelector("#selectedProject").classList[1]}`;
    projectData.set("projectPriority", projectPriority);

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.name = "project";
    newInput.id = `${projectData.get("projectTitle").toLowerCase()}`;
    newInput.value = `${projectData.get("projectTitle").toLowerCase()}`;

    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", `${projectData.get("projectTitle").toLowerCase()}`)
    newLabel.classList.add(projectPriority)
    newLabel.textContent = `${projectData.get("projectTitle")}`;
    newLabel.addEventListener("click", function() {
        event.stopPropagation();
    })

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(newLabel);
}

export { newProject };