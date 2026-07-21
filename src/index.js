import "./styles.css";

import { newProject } from "./projectCreate.js";

import { createTaskForm } from "./taskFormSetup.js";
import { createProjectForm } from "./projectFormSetup.js";

window.addEventListener("load", function() {
    let noteData = document.querySelector("#taskInfo");
    let projectData = document.querySelector("#projectInfo");

    createTaskForm();
    createProjectForm(); //adjust styling for this

})