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
    deleteProject(nameElement) {
        const projectName = nameElement.textContent;
        const index = projectManager.projects.findIndex((proj) => proj.newProject.getName() === projectName);

        if (index !== -1) {
            return projectManager.projects.splice(index, 1);
        }
        nameElement.parentElement.remove();
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
    getDesription() {
        return this.description;
    }
    getCompleted() {
        return this.completed;
    }

    getEdited() {
        return this.edited;
    }

}



function projectCreator() {
    const displayProject = () => {
        let name = projectNameInput.value;

        const newProj = new Project(name);
        projectManager.addProject(newProj);

        const html = `
        <div class="projects-container">
                <ul class="project-name">
                    <li>
                    <p>${newProj.name}</p>
                    <button class="delete-project-btn">Delete</button>
                    </li>
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
// projectsContainer.addEventListener('click', (e) => {
//     if (e.target.classList.contains('.delete-project-btn')) {
//         const project = e.target.closest('.project-name');
//         const projectName = project.querySelector('a').textContent;
//         projectManager.deleteProject(projectName);
//         project.remove();
//     }
// })

const projectManager = new ProjectManager();
const newProject = new Project();
