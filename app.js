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
const projectForm = document.querySelector('#project-form');
const toDoForm = document.querySelector('#todo-form');

// Form inputs
const projectNameInput = document.querySelector('.project-form-input');
const toDoInput = document.querySelector('.todos-form-input');
const dueDateInput = document.querySelector('.due-date');

//
const projectsContainer = document.querySelector('.projects-container');
const toDosContainer = document.querySelector('.todos-container');

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
    id;
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
        const element = nameElement.querySelector('li p'); // First select element
        const projName = element.textContent; //  Get the text of that element (the project's name)

        const index = this.projects.findIndex(p => p.getName() === projName);  // Find the index of the project in array
        if (index !== -1) {
            this.projects.splice(index, 1); // If index is not -1 splice that project
        }

        nameElement.remove(); // Remove whole element
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
    dueDate;
    currentID;
    completed;
    edited;
    constructor(description, dueDate) {
        this.description = description;
        this.dueDate = dueDate;
        this.currentID = 1;
        this.completed = false;
        this.edited = false;
    }
    setDescription(description) {
        this.description = description;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    setCompleted(completedStatus) {
        this.completed = completedStatus;
    }
    setEdited(edited) {
        this.edited = edited;
    }
    generateID() {
        return this.currentID++;
    }
    completeToggle() {
        this.completed = !this.completed;
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
                    <p class='proj-name'>${newProj.name}</p>
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

    return { displayProject }
}


function todosCreator() {
    const displayToDo = () => {
        let description = toDoInput.value;
        let dueDate = dueDateInput.value;

        const newTodo = new ToDo(description, dueDate);
        newProject.addTodo(newTodo);
        console.log(newTodo);

        const html = `
        <div>
                <article class="todo-name">
                    <input type="checkbox">
                    <p class="description">${newTodo.description}</p>
                    <p class="date">Date: ${newTodo.dueDate}</p>
                    <button class="edit-todo">Edit</button>
                    <button class="delete-todo">Delete</button>
                </article>
                </div>
        `
        const div = document.createElement('div');
        div.innerHTML = html;
        toDosContainer.appendChild(div)
        toDoForm.reset();
    }

    return { displayToDo }

}

const creator = projectCreator();
const toDoCreator = todosCreator();

// Show inputs listeners
showProjectsInput.addEventListener('click', () => showAddForm(projectForm));
showToDoInput.addEventListener('click', () => showAddForm(todoFormDiv));
// Hide inputs listeners
cancelProjectBtn.addEventListener('click', () => hideAddForm(projectForm));
cancelToDoBtn.addEventListener('click', () => hideAddForm(todoFormDiv));

// Add project and todo
addProjectBtn.addEventListener('click', () => {
    console.log(projectManager.getProjects());
    creator.displayProject();
})

toDobtn.addEventListener('click', () => {
    toDoCreator.displayToDo();
})

// Delete project
projectsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains("delete-project-btn")) {  // If container have class of delete btn  
        const nameElement = target.closest('.projects-container'); // Select  closest parent with class "projects-container"
        projectManager.deleteProject(nameElement); // Than  remove the project from manager and DOM
    }
})

const projectManager = new ProjectManager();
const newProject = new Project();
