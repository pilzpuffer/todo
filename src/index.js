import "./styles.css";

import { newNote } from "./noteCreate.js";
import { newProject } from "./projectCreate.js";

window.addEventListener("load", function() {
    let noteData = document.querySelector("#taskInfo");
    let projectData = document.querySelector("#projectInfo");

    let newProjectButton = document.querySelector("#newProject");
    let projectModal = document.querySelector("#projectOpen"); 
    let projectModalClose = document.querySelector("#projectClose");
    let projectModalSubmit = document.querySelector("#projectSubmit");

    let newTaskButton = document.querySelector("#newTask");
    let taskModal = document.querySelector("#taskOpen");
    let taskModalClose = document.querySelector("#taskClose");
    let taskModalSubmit = document.querySelector("#taskSubmit")

    let modals = {
            project: {
                button: newProjectButton,
                type:  projectModal,
                close:  projectModalClose,
                submit: projectModalSubmit,
                new: newProject
            },
            task: {
                button: newTaskButton,
                type:  taskModal,
                close:  taskModalClose,
                submit: taskModalSubmit,
                new: newNote
            }
    }

    let handleSubmit = function(event) {
        event.preventDefault();
        let currentModalSubmit = event.target.id.replace("Submit", "");
        modals[currentModalSubmit].new()
    }

    let clearForms = function() {
        noteData.reset();
        projectData.reset();
    }

    let validateProjectForm = function() {
        let title = document.forms["projectInfo"]["title"].value;

        let allProjects = document.querySelectorAll("input[name='project']");
        let projectList = [];

        allProjects.forEach(project => projectList.push(project.id.toLowerCase()));
        console.log(projectList);

        if (projectList.includes(title.toLowerCase()) || title.length === 0) {
            alert("Please create a new project.");
            return false
        } else {
            return true
        }
    }

    let handleModalClick = function() {

            Object.keys(modals).forEach(modal => {
                let currentModal = modals[modal];
                
                currentModal.button.addEventListener("click", () => {
                    currentModal.type.showModal();
                })

                currentModal.close.addEventListener("click", () => {
                    currentModal.type.close();
                })

                currentModal.submit.addEventListener("click", (event) => {
                    event.preventDefault();
                    let modalType = currentModal.button.id.replace("new", "").toLowerCase();
                    
                    if ( (modalType === "project" && validateProjectForm()) || modalType === "task") {
                        modals[modalType].new();
                        clearForms();
                        currentModal.type.close();
                    }
                })
                
        });
    }
    
    handleModalClick();

})