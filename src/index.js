import "./styles.css";

import { newProject } from "./projectCreate.js";

import { createTaskForm } from "./taskFormSetup.js";
import { createProjectForm } from "./projectFormSetup.js";



window.addEventListener("load", function() {
    let noteData = document.querySelector("#taskInfo");
    let projectData = document.querySelector("#projectInfo");

    let createProjectManually = function(name) {
    let projectSubmitButton = document.querySelector("#projectSubmit");

    document.forms['projectInfo'].elements['projectTitle'].value = name;

    projectSubmitButton.click();
}

    createTaskForm();
    createProjectForm();
    createProjectManually('main');

})