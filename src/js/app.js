const todoInput = document.querySelector('.todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
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

    // // create button delete
    // const deleteButton = document.createElement('button');
    // deleteButton.classList.add('fas', 'fa-trash', 'delete-btn')
    // todoDiv.appendChild(deleteButton);

    // make todoDiv child from todoList
    todoList.appendChild(todoDiv);
}

//functions
function addTodo (e) {
    // prevent form to submitting
    e.preventDefault();
    
    createElements(todoInput.value);

    // add item todo list to localstorage
    saveTodoInLocalStorage(todoInput.value);

    // clear Input todo after add todo item
    todoInput.value = "";
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

    // delete item todo list
    if (item.classList[2] === "delete-btn"){
        const todo = item.parentElement;
        removeTodoFromLocalStorage(todo);
        todo.remove();
    }
}

// check if item todo list is already exist in local storage or not
let existOrNot = () => {

    let items = checklistFromFile; 
    // if (localStorage.getItem('items') === null) {
    //     items = [];
    // }else {
    //     items = JSON.parse(localStorage.getItem('items'));
    // }
    return items
}

let saveTodoInLocalStorage = (item) => {
    let items = existOrNot();

    items.push(item);

    console.log(items);
    localStorage.setItem("items", JSON.stringify(items));
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

let getTodoFromLocalStorage = () => {
    fetch('./checklist.json').then(response => {
        return response.json();
    }).then(data => {
        let sections = data.sections
        sections.forEach(section => {
            createSection(section)
        });
    });
    
}

let removeTodoFromLocalStorage = (item) => {
    
    let items = existOrNot();

    //  set index item want to delete
    const itemIndex = item.children[0].innerText

    // delete element from array with method splice, 1 is number how many element / item we delete
    items.splice(items.indexOf(itemIndex), 1);

    // refresh data in local storage
    localStorage.setItem('items', JSON.stringify(items));
}


// Event Listener
document.addEventListener('DOMContentLoaded', getTodoFromLocalStorage);
// addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkOrDelete);
