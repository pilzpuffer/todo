import "./styles.css";

import { newProject } from "./projectCreate.js";

import { createTaskForm } from "./taskFormSetup.js";

window.addEventListener("load", function() {
    let noteData = document.querySelector("#taskInfo");
    let projectData = document.querySelector("#projectInfo");

    let newProjectButton = document.querySelector("#newProject");
    let projectModal = document.querySelector("#projectOpen"); 
    let projectModalClose = document.querySelector("#projectClose");
    let projectModalSubmit = document.querySelector("#projectSubmit");

    let modals = {
            project: {
                button: newProjectButton,
                type:  projectModal,
                close:  projectModalClose,
                submit: projectModalSubmit,
                new: newProject
            },
    }

    createTaskForm();

    let handleSubmit = function(event) {
        event.preventDefault();
        let currentModalSubmit = event.target.id.replace("Submit", "");
        modals[currentModalSubmit].new()
    }

    let clearForms = function() {
        projectData.reset();
    }

    let validateProjectForm = function() {
        let title = document.forms["projectInfo"]["title"].value;

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

    let simulateMainCreationAndClick = function() {
        document.forms['projectInfo'].elements['title'].value = 'Main';
        document.forms['projectInfo'].elements['priority'].value = 'Medium';
        modals.project.submit.click();
        
        let mainInput = document.querySelector("#main");
        mainInput.click();
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

                
                if ( (modalType === "project" && validateProjectForm()) || (modalType === "task" && validateTaskForm()) ) {
                    modals[modalType].new();
                    clearForms();
                    currentModal.type.close();
                }

            })
            
        });
    }
    
    handleModalClick();
    simulateMainCreationAndClick();

})