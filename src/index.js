import "./styles.css";

import { newNote } from "./noteCreate.js";
import { newProject } from "./projectCreate.js";

import { stackMaker } from "./taskFormSetup.js";

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
    let taskModalSubmit = document.querySelector("#taskSubmit");

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

    //test
    let buttonControl = document.querySelector("#control");
    let paperStackButton = document.createElement("button");
    paperStackButton.textContent = "test stack!";

    paperStackButton.addEventListener("click", stackMaker);

    buttonControl.appendChild(paperStackButton);


    //test

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

    let validateTaskForm = function() {
        let titleLength = document.forms["taskInfo"]["title"].value.length;
        let descriptionLength = document.forms["taskInfo"]["description"].value.length;

        console.log(titleLength, descriptionLength);

        if (descriptionLength === 0 && titleLength === 0) {
            alert("Please write something on this new note.");
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