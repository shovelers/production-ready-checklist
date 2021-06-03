const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let createElements = (value) => {
    // create div container
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create element li 
    const newTodo = document.createElement('li');
    newTodo.innerText= value;
    newTodo.classList.add('todo-item');

    // make newTodo child from todoDiv
    

    // create button check
    const checkButton = document.createElement('button');
    checkButton.classList.add('fas', 'fa-check', 'check-btn') // error if use space, so split class with '', 
    
    todoDiv.appendChild(checkButton);
    todoDiv.appendChild(newTodo);


    // make todoDiv child from todoList
    todoList.appendChild(todoDiv);
}

// function check or delete what user click
let checkOrDelete = (e) => {
    const item = e.target;
    // console.log(e.target)

    //chech item todo list
    if (item.classList[2] === "check-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('check');
    }
}

let createSection = (section) => {
    // create div container
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('section-title');
    sectionTitle.innerText = section.title;
    todoList.appendChild(sectionTitle);
    section.items.forEach(item => {
        createElements(item.title);
    })
}

let getTodoFromFile = () => {
    fetch('./checklist.json').then(response => {
        return response.json();
    }).then(data => {
        let sections = data.sections
        sections.forEach(section => {
            createSection(section)
        });
    });
    
}

// Event Listener
document.addEventListener('DOMContentLoaded', getTodoFromFile);
// addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkOrDelete);
