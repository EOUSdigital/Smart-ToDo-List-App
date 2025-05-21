//TODO 📚 Module 4 - Lesson 02.03.04 Creating a Function - Smart ToDo List App

const completedDisplay = document.querySelector('#completed-display');
const uncompletedDisplay = document.querySelector('#uncompleted-display');

const taskManager = (function () {
    const tasks = [];

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks.push(...storedTasks);
    }

    function addTask(task) {
        if (!task.name || !task.category) {
            alert ('Please write your task.');
            return;
        }
        tasks.push(task);
        saveTasks();
    };

    function removeTask(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1)
        }
        saveTasks();
    };

    function toggleTaskComplete(id) { 
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        saveTasks();
    };

    function getTasks() { 
        return tasks.slice();
    };

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return {
        addTask,
        removeTask,
        toggleTaskComplete,
        getTasks
    };

})();

taskManager.addTask({ id: 1, name: 'Study', category: 'education', completed: false });
console.log(taskManager.getTasks());

const input = document.querySelector('#task-input');
const category = document.querySelector('#category-select');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');

addBtn.addEventListener('click', function() {
    const name = input.value.trim();
    const selectedCategory = category.value;

    if (!name || !selectedCategory) {
        alert('Please enter both task and category.');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: name,
        category: selectedCategory,
        completed: false
    };
    
    taskManager.addTask(newTask);
    renderTasks();
    
    input.value = '';
    category.value = '';
})

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = taskManager.getTasks();

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name} (${task.category})`;

        if (task.completed) {
            li.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            taskManager.toggleTaskComplete(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    const completedCount = tasks.filter(task => task.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    completedDisplay.textContent = completedCount;
    uncompletedDisplay.textContent = uncompletedCount;
}

renderTasks();


