let newProject = function() {
    let projectForm = document.querySelector("#projectInfo");

    const projectData = new FormData(projectForm);

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.id = `${projectData.get("title").toLowerCase()}`;
    newInput.name = "project";
    newInput.value = `${projectData.get("title").toLowerCase()}`;

    let newLabel = document.createElement("label");
    newLabel.classList.add(`${projectData.get("priority").toLowerCase()}`);
    newLabel.setAttribute("for", `${projectData.get("title").toLowerCase()}`)
    newLabel.textContent = `${projectData.get("title")}`;
    newLabel.addEventListener("click", function() {
        event.stopPropagation();
    })

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(newLabel);
}

export { newProject };