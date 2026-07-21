let newProject = function() {
    let projectForm = document.querySelector("#projectInfo");

    const projectData = new FormData(projectForm);

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.id = `${projectData.get("projectTitle").toLowerCase()}`;
    newInput.name = "project";
    newInput.value = `${projectData.get("projectTitle").toLowerCase()}`;

    let newLabel = document.createElement("label");
    // newLabel.classList.add(`${projectData.get("priority").toLowerCase()}`);
    newLabel.setAttribute("for", `${projectData.get("projectTitle").toLowerCase()}`)
    let getSelectedColor = document.querySelector("#selectedProject").getAttribute('style');
    newLabel.setAttribute("style", getSelectedColor);
    newLabel.textContent = `${projectData.get("projectTitle")}`;
    newLabel.addEventListener("click", function() {
        event.stopPropagation();
    })

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(newLabel);
}

export { newProject };