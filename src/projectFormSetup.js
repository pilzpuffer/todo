import { createInput, assignRandomUniqueArrayValue } from "./taskFormSetup.js";

let validateProjectForm = function() {
    let title = document.forms["projectInfo"]["projectTitle"].value;

    let allProjectInputs = document.querySelectorAll("input[name='project']");
    let projectList = [];

    allProjectInputs.forEach(project => projectList.push(project.id.toLowerCase()));

    if (projectList.includes(title.toLowerCase()) || title.length === 0) {
        alert("Please create a unique project.");
        return false
    } else {
        return true
    }
}

let createProjectForm = function() {
    let allProjectColors = ["critical", "high", "medium", "low", "minimal"];
    let presentColors = [];

    let projectForm = document.createElement("form");
    projectForm.id = 'projectInfo';
    projectForm.setAttribute('method', 'post');

    let projectHolder = document.querySelector("#allProjects");
    let newInput = document.createElement("input");
    newInput.type = "radio";
    newInput.id = "newProject";
    newInput.name = "newProject";

    let labelHolder = document.createElement("div");
    labelHolder.classList.add("projectWrapper");

    for (let i = 0; i < 5; i++) {
        console.log('this ran')
        let label = document.createElement("label");
        let labelColor = `${assignRandomUniqueArrayValue(allProjectColors, presentColors)}`
        label.classList.add("newProject", labelColor);
        label.setAttribute("for", "newProject")
        label.style.backgroundColor = `var(--${labelColor})`;

        label.addEventListener("click", function() {
            event.stopPropagation();

            if (event.target.classList[0] === 'newProject' && event.target.id !== 'selectedProject') {
                let allNewProjects = document.querySelectorAll(".newProject");
                allNewProjects.forEach((project) => {
                    if (project.id === 'selectedProject') {
                        let currentlySelected = document.querySelector('#selectedProject');
                        currentlySelected.removeChild(projectForm);
                        currentlySelected.removeAttribute('id'); 
                    }
                })
                event.target.id = 'selectedProject';
                // event.target.appendChild(pinButton); add some kind of tape or paperclip instead?
                event.target.appendChild(projectForm);  
            }
        })

        labelHolder.appendChild(label)
    }

    createInput('textarea', 'projectTitle', 'projectTitle', 'Add a title', projectForm)

    projectHolder.appendChild(newInput);
    projectHolder.appendChild(labelHolder);
    let mediumLabel = document.querySelector(".newProject.medium");
    mediumLabel.click();
}

export { createProjectForm }