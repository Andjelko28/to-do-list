// Show inputs
const showProjectsInput = document.querySelector('.show-input-btn');
const showToDoInput = document.querySelector('.add-todos');

// Form buttons
const addProjectBtn = document.querySelector('.add-project-btn');
const toDobtn = document.querySelector('.add-todo-btn');
const cancelProjectBtn = document.querySelector('.cancel-project-btn');
const cancelToDoBtn = document.querySelector('.cancel-todo-btn');

// Form divs
const projectFormDiv = document.querySelector('.add-project-form');
const todoFormDiv = document.querySelector('.add-todo-form');

// Forms
const projectForm = document.querySelector('#project-form')

// Form inputs
const projectNameInput = document.querySelector('.project-form-input');

//
const projectsContainer = document.querySelector('.projects-container');

// Delete button for project
const deleteProject = document.querySelector('.delete-project-btn');


function showAddForm(el) {
    el.style.visibility = 'visible';
}

function hideAddForm(el) {
    el.style.visibility = 'hidden';
}
class ProjectManager {
    projects;
    constructor() {
        this.projects = [];
    }
    setProjects(projects) {
        this.projects = projects;
    }
    getProjects() {
        return this.projects;
    }
    addProject(project) {
        this.projects.push(project);
    }
    deleteProject(projectName) {
        const projectToDelete = this.projects.find((project) => project.getName() === projectName)
        this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    }
}

class Project {
    name;
    todos;
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    deleteToDo() {

    }
}


class ToDo {
    description;
    completed;
    edited;
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.edited = false;
    }
    setDescription(description) {
        this.description = description;
    }
    setCompleted(completed) {
        this.completed = completed;
    }
    setEdited(edited) {
        this.edited = edited;
    }

}



function projectCreator() {
    const displayProject = () => {
        let name = projectNameInput.value;

        const newProj = new Project(name);
        projectManager.addProject(newProj);

        const html = `
        <div class="projects-container">
                <div class="project-name">
                    <a href="#">${newProject.name}</a>
                    <button class="delete-project-btn">Delete</button>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = html;
        projectsContainer.appendChild(div);
        projectForm.reset()
    }

    const deleteProject = () => {

    }

    return { displayProject }
}




const creator = projectCreator();

// Show inputs listeners
showProjectsInput.addEventListener('click', () => showAddForm(projectForm));
showToDoInput.addEventListener('click', () => showAddForm(todoFormDiv));
// Hide inputs listeners
cancelProjectBtn.addEventListener('click', () => hideAddForm(projectForm));
cancelToDoBtn.addEventListener('click', () => hideAddForm(todoFormDiv));

// Add project
addProjectBtn.addEventListener('click', () => {
    console.log(projectManager.getProjects());
    creator.displayProject();
})

// Delete project
// deleteProject.addEventListener('click', (e) => {
//    const project =  e.target.closest('.project-name')
//     projectManager.deleteProject(project);
// })

const projectManager = new ProjectManager();
const newProject = new Project();