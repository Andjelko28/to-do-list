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
const projectForm =document.querySelector('#project-form')

// Form inputs
const projectNameInput = document.querySelector('.project-form-input');

//
const projectsContainer = document.querySelector('.projects-container');


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
    addProject(project) {
        this.projects.push(project);
    }
    deleteProject() {

    }
}

class Project {
    name;
    todos;
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
    addTodo() {

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
}



function projectCreator() {
    const displayProject = () => {
        let name = projectNameInput.value;

        const newProject = new Project(name);
        projectManager.addProject(newProject);

        const html = `
        <div class="projects-container">
                <div class="project-name">
                    <p>${newProject.name}</p>
                    <button class="delete-project-btn">Delete</button>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = html;
        projectsContainer.appendChild(div);
        projectForm.reset()
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
    creator.displayProject();
})

const projectManager = new ProjectManager();