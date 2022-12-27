const todoList = document.getElementById('todo-list');  //ul elementi
const todoInput = document.getElementById('todo-input');  //input elementi
const todoButton = document.getElementById('todo-button');  //button elementi

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const createTodoItem = (text) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item', 'todo');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = text;
    const todoItemRemove = document.createElement('i');
    todoItemRemove.classList.add('fas', 'fa-trash-alt');
    todoItemRemove.setAttribute('onclick', 'removeToDo(this)');
    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemRemove);
    todoList.appendChild(todoItem);
}

window.addEventListener("load", () => {
    todos.forEach(todo => {
        createTodoItem(todo);
    });
})

todoButton.addEventListener('click', () => {
    let input = todoInput.value;
    todoInput.value = '';
    todos.push(input.toString());
    localStorage.setItem('todos', JSON.stringify(todos));
    createTodoItem(input);
});

const removeToDo = (target) => {
    const todo = target.parentNode.childNodes[0].innerHTML;
    removeTodoFromStorage(todo);
    todoInput.value = "";
    location.reload();
}

const removeTodoFromStorage = (todo) => {
    const index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

todoInput.addEventListener('keyup', () => {
    if (event.keyCode === 123) todoButton.click();
})