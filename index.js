const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const filterDate = document.getElementById('filter-date');
const searchInput = document.getElementById('search');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        created_at: new Date(),
        due_date: new Date(document.getElementById('due_date').value),
        isCompleted: false,
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    todoForm.reset();
});

function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        const filterDateValue = new Date(filterDate.value).setHours(0, 0, 0, 0);
        const todoDueDate = new Date(todo.due_date).setHours(0, 0, 0, 0);
        const searchTerm = searchInput.value.toLowerCase();

        return (!filterDate.value || todoDueDate === filterDateValue) && 
               (todo.title.toLowerCase().includes(searchTerm) || 
                todo.description.toLowerCase().includes(searchTerm));
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <strong>${todo.title}</strong>
                <p>${todo.description}</p>
                <small>Due: ${new Date(todo.due_date).toLocaleString()}</small>
            </div>
            <div>
                <button onclick="markAsCompleted(${index})">Complete</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;

        if (todo.isCompleted) {
            li.style.textDecoration = 'line-through';
        }

        todoList.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function markAsCompleted(index) {
    todos[index].isCompleted = true;
    saveTodos();
    renderTodos();
}

filterDate.addEventListener('change', renderTodos);
searchInput.addEventListener('input', renderTodos);

renderTodos();
