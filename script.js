
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');


toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);


let values = localStorage.getItem('values');

// Functions
function addToDo(event) {
    //Prevents form from relaoding.
    event.preventDefault();

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${values}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("You must write something!");
        } 
    else {
        
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage.
        savelocal(toDoInput.value);

        // check btn.
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="bi bi-check"></i>';
        checked.classList.add('check-btn', `${values}-button`);
        toDoDiv.appendChild(checked);
        // delete btn.
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="bi bi-trash"></i>';
        deleted.classList.add('delete-btn', `${values}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list.
        toDoList.appendChild(toDoDiv);

        // CLearing the input.
        toDoInput.value = '';
    }
}   


function deletecheck(event){

    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos.
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }
}


// Saving to local storage:
function savelocal(todo){
    //Check if items are there.
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    //Check if items are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${values}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="bi bi-check"></i>';
        checked.classList.add("check-btn", `${values}-button`);
        toDoDiv.appendChild(checked);
        // delete btn
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="bi bi-trash"></i>';
        deleted.classList.add("delete-btn", `${values}-button`);
        toDoDiv.appendChild(deleted);


        toDoList.appendChild(toDoDiv);
    });
}


function removeLocalTodos(todo){
    //Check if items are there
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

