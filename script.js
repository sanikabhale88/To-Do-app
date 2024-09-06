document.addEventListener('DOMContentLoaded', loadTodos);


document.getElementById('add-btn').addEventListener('click', addTodo);


document.getElementById('filter-all').addEventListener('click', () => filterTodos('all'));
document.getElementById('filter-pending').addEventListener('click', () => filterTodos('pending'));
document.getElementById('filter-completed').addEventListener('click', () => filterTodos('completed'));

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    
    if (todoText === '') return;

    const todoObj = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todoObj);
    saveTodos();
    renderTodos(todos);
    
    todoInput.value = '';
}

function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        li.appendChild(span);
        
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => toggleComplete(todo.id));
        li.appendChild(completeBtn);
        
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTodoText(todo.id));
        li.appendChild(editBtn);
        
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
}

function toggleComplete(id) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    saveTodos();
    renderTodos(todos);
}

function editTodoText(id) {
    const newText = prompt('Edit your task:');
    if (newText) {
        todos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
        saveTodos();
        renderTodos(todos);
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos(todos);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    renderTodos(todos);
}

function filterTodos(filter) {
    const allFilterBtns = document.querySelectorAll('.filter-btn');
    allFilterBtns.forEach(btn => btn.classList.remove('active'));
    
    if (filter === 'all') {
        document.getElementById('filter-all').classList.add('active');
        renderTodos(todos);
    } else if (filter === 'pending') {
        document.getElementById('filter-pending').classList.add('active');
        renderTodos(todos.filter(todo => !todo.completed));
    } else if (filter === 'completed') {
        document.getElementById('filter-completed').classList.add('active');
        renderTodos(todos.filter(todo => todo.completed));
    }
}
