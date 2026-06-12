import "./styles.css";

import { projectSetUp } from "./projectCreate.js";

window.addEventListener("load", function() {

    let handleModalClick = function() {

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
                },
                task: {
                    button: newTaskButton,
                    type:  taskModal,
                    close:  taskModalClose,
                    submit: taskModalSubmit,
                }
        }

            Object.keys(modals).forEach(modal => {
                let currentModal = modals[modal];
                
                currentModal.button.addEventListener("click", () => {
                    currentModal.type.showModal();
                })

                currentModal.close.addEventListener("click", () => {
                    currentModal.type.close();
                })
        });
    }
    
    handleModalClick();

})