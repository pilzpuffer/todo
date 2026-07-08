let newProject = function() {
    let allProjects = document.querySelectorAll("input[name='project']");
    let projectList = [];

    allProjects.forEach(project => projectList.push(project.id));
    console.log(projectList);

    let projectForm = document.querySelector("#projectInfo");

    const projectData = new FormData(projectForm);

    for (const entry of projectData.entries()) {
        console.log(entry);
    }

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.id = `${projectData.get("title").toLowerCase()}`;
    newInput.name = "project";
    newInput.value = `${projectData.get("title").toLowerCase()}`;

    let newLabel = document.createElement("label");
    newLabel.classList.add(`${projectData.get("priority").toLowerCase()}`);
    newLabel.for = `${projectData.get("title").toLowerCase()}`;
    newLabel.textContent = `${projectData.get("title")}`;

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(newLabel);

    console.log('yay, new project!!!')
}

export { newProject };