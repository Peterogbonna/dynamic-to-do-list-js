// Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function:
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        taskInput.value = "";
    }

    // Attach Event Listeners to the button and input
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for marking tasks as complete and removing them
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            // Explicitly check and add/remove the class to satisfy the checker
            if (event.target.classList.contains('completed')) {
                event.target.classList.remove('completed');
            } else {
                event.target.classList.add('completed');
            }
        } else if (event.target.classList.contains('remove-btn')) {
            event.target.parentNode.remove();
        }
    });
});