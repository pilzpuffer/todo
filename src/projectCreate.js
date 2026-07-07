
let newProject = function() {
    let allProjects = document.querySelectorAll("input[name='project']");
    let projectList = [];

    allProjects.forEach(project => projectList.push(project.id));
    console.log(projectList);

    console.log('yay, new project!!!')
}

export { newProject };