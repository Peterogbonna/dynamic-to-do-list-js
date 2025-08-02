document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to save tasks to Local Storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.firstChild.textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Function to create and append a new task element
    function createTaskElement(taskText, isCompleted = false) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }
    
    // The main addTask function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTasksToLocalStorage();
        taskInput.value = "";
    }

    // Attach Event Listeners to the button and input
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Use event delegation for click events on the task list
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            saveTasksToLocalStorage();
        } else if (event.target.classList.contains('remove-btn')) {
            event.target.parentNode.remove();
            saveTasksToLocalStorage();
        }
    });

    // Invoke loadTasks on DOMContentLoaded
    loadTasks();
});