
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${task.id}, event)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id}, event)">Delete</button>
            </div>
        `;
        li.addEventListener('click', () => toggleTaskCompletion(task.id));
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function editTask(id, event) {
    event.stopPropagation();  
    const taskText = prompt('Edit your task:');
    if (taskText !== null && taskText.trim() !== '') {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, text: taskText.trim() } : task
        );
        renderTasks();
    }
}

function deleteTask(id, event) {
    event.stopPropagation(); 
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        renderTasks(filter);
    });
});
