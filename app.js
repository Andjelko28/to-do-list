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
const editContainer = document.querySelector('.edit-container');

// Delete button for project
const deleteProject = document.querySelector('.delete-project-btn');
const deleteTodo = document.querySelector('.delete-todo');

// Select ul and article
const ul = document.querySelector('.project-name');
const art = document.querySelector('.todo-name');

// Edit btn
const editBtn = document.querySelector('.edit-btn');

function showAddForm(el) {
    el.style.visibility = 'visible';
}

function hideAddForm(el) {
    el.style.visibility = 'hidden';
}
class ProjectManager {
    projects;
    currentProject;
    constructor() {
        this.projects = [];
        this.currentProject = null;
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
    setCurrentProject(project) {
        this.currentProject = project;
    }
    getCurrentProject() {
        return this.currentProject;
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
    findProject(nameElement) {

        const element = nameElement.querySelector('li p');
        const projName = element.textContent;
        const index = this.projects.findIndex(p => p.getName() === projName);
        if (index !== -1) {
            this.currentProject = this.projects[index];
        }
        console.log(this.currentProject);
        return this.currentProject.todos;
    }
    addTodo(todo) {
        this.currentProject.todos.push(todo);
    }
}

class Project {
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
    deleteTodoById(todoId) {
        // Find todo, or index of that todo
        const element = projectManager.currentProject.todos[2];
        const index = projectManager.currentProject.todos.findIndex(todo => todo.id === element);
        if (index !== -1) {
            projectManager.currentProject.todos.splice(index, 1); // Then if is not -1 delete it
            console.log("Todo deleted");
        } else {
            console.log("Todo not found", todoId);
        }
    }
}




class ToDo {
    description;
    dueDate;
    id;
    completed;
    constructor(description, dueDate) {
        this.description = description;
        this.dueDate = dueDate;
        this.id = self.crypto.randomUUID();
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
                    <p class='proj-name'>${newProj.name}</p>
                    <button class="delete-project-btn">Delete</button>
        `;

        const li = document.createElement('li');
        li.classList.add("list-group-item");
        li.innerHTML = html;
        ul.appendChild(li);
        projectForm.reset()
    }


    return { displayProject }
}


function todosCreator() {

    const createToDo = () => {

        let description = toDoInput.value;
        let dueDate = dueDateInput.value;

        if (!projectManager.getCurrentProject()) {
            alert("Please select a project first!");
            return;
        }

        // Create a new todo
        const newTodo = new ToDo(description, dueDate);
        // Add the todo to the currently selected project
        projectManager.addTodo(newTodo);

        // const html = `
        //         <article class="todo-name">
        //             <input type="checkbox">
        //             <p class="description">${description}</p>
        //             <p class="date">Date: ${dueDate}</p>
        //             <button class="edit-todo">Edit</button>
        //             <button class="delete-todo">Delete</button>
        //         </article>
        // `
        // const div = document.createElement('div');
        // div.innerHTML = html;
        // toDosContainer.appendChild(div);
        // toDoForm.reset();
    }

    const displayToDo = () => {

        const todos = projectManager.currentProject.todos;
        console.log(todos);



        todos.forEach((todo) => {
            const html = `
            <article class="todo-name">
                <input type="checkbox">
                <p class="description">${todo.description}</p>
                <p class="date">Date: ${todo.dueDate}</p>
                <button class="edit-todo">Edit</button>
                <button class="delete-todo">Delete</button>
            </article>
    `

            const div = document.createElement('div');
            div.innerHTML = html;
            toDosContainer.appendChild(div);
            toDoForm.reset();
        })

    }

    return { createToDo, displayToDo }

}

function editTodos() {

    const displayEdit = (editElement) => {

        if (editElement) {
            const index = projectManager.currentProject.todos.findIndex(todo => todo.id === editElement);
            if (index) {

                const editForm = document.createElement('form');
                const todo = projectManager.currentProject.todos[index];
                console.log(index);
                
                editForm.innerHTML = `
                 <h2>Edit Todo:</h2>
                 <input type='text' class='edit-desc' value='${todo.description}'>
                 <input type='date' class='edit-date' value='${todo.dueDate}'>
                 <input type='checkbox' class='edit-check' value='${todo.completed}'>
                 <button type='button' class='submit-edit'>Submit</button> 
                 `

                editContainer.style.display = 'block';
                editContainer.appendChild(editForm);
            }
        }
    }

    return { displayEdit }
}

const creator = projectCreator();
const toDoCreator = todosCreator();
const edit = editTodos();

// Show inputs listeners
showProjectsInput.addEventListener('click', () => showAddForm(projectForm));
showToDoInput.addEventListener('click', () => showAddForm(todoFormDiv));
// Hide inputs listeners
cancelProjectBtn.addEventListener('click', () => hideAddForm(projectForm));
cancelToDoBtn.addEventListener('click', () => hideAddForm(todoFormDiv));

// Add project and todo
addProjectBtn.addEventListener('click', () => {
    creator.displayProject();
})

toDobtn.addEventListener('click', () => {
    toDoCreator.createToDo();
    toDoForm.reset();
})

// Delete project
ul.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains("delete-project-btn")) {  // If container have class of delete btn  
        const nameElement = target.closest('.list-group-item'); // Select  closest parent with class "projects-container"
        projectManager.deleteProject(nameElement);
        toDosContainer.innerHTML = ''; // Than  remove the project from manager and DOM
    } else {
        const nameElement = target.closest('.list-group-item')

        projectManager.findProject(nameElement);

        toDosContainer.innerHTML = '';

        toDoCreator.displayToDo();
    }
})

toDosContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains("delete-todo")) { // Check if it is clicked on this btn
        const todoElement = target.closest('.todo-name'); // Then find closest  parent with that class
        newProject.deleteTodoById(todoElement); // Then call function for deleting that element
        todoElement.remove(); // Clear HTML el from DOM
    } else if (target.classList.contains('edit-todo')) {
        const editElement = target.closest('.todo-name');
        edit.displayEdit(editElement);
    }
});




const projectManager = new ProjectManager();
const newProject = new Project();
const newTodo = new ToDo();
