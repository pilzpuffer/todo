import "./styles.css";

import { projectSetUp } from "./projectCreate.js";
import { newNote } from "./noteCreate.js";
import { newProject } from "./projectCreate.js";

window.addEventListener("load", function() {
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
                    handleSubmit(event);
                    currentModal.type.close();
                })
                
        });
    }
    
    handleModalClick();

})