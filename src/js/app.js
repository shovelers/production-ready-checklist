const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let showAutoExpand = true;

let createElements = (item) => {
    // create div container
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create element li 
    const newTodo = document.createElement('li');
    newTodo.innerText= item.title;
    newTodo.classList.add('todo-item');

    // make newTodo child from todoDiv
    

    // create button check
    const checkButton = document.createElement('button');
    checkButton.classList.add('fas', 'fa-check', 'check-btn');
    todoDiv.appendChild(checkButton);
    todoDiv.appendChild(newTodo);
    const detailPanel = document.createElement('div');
    // create button check
    const expandButton = document.createElement('button');

    if(showAutoExpand) {
        detailPanel.classList.add('detail-panel', 'show');
        expandButton.classList.add('fas', 'fa-minus', 'expand-btn');
        showAutoExpand = false;
    }else {
        detailPanel.classList.add('detail-panel');
        expandButton.classList.add('fas', 'fa-plus', 'expand-btn');
    }
    detailPanel.innerText = item.description;

    todoDiv.appendChild(expandButton);

    // make todoDiv child from todoList
    todoList.appendChild(todoDiv);
    todoList.appendChild(detailPanel);
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
    if (item.classList.contains("fa-plus")){
        item.classList.add('fa-minus');
        const panel = item.parentElement.nextSibling;
        item.classList.remove('fa-plus');
        panel.classList.add('show');
        return
    }

    if (item.classList.contains("fa-minus")){
        const panel = item.parentElement.nextSibling;
        item.classList.add('fa-plus');
        item.classList.remove('fa-minus');
        panel.classList.remove('show');
        return
    }
}

let createSection = (section) => {
    // create div container
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('section-title');
    sectionTitle.innerText = section.title;
    todoList.appendChild(sectionTitle);
    section.items.forEach(item => {
        createElements(item);
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