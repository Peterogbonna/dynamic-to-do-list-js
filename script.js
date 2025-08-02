// Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function:
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Task Creation:
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach Event Listeners to the buttons and input
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Use event delegation on the taskList to handle clicks on dynamically created elements
    taskList.addEventListener('click', function(event) {
        // Check if the clicked element is an li
        if (event.target.tagName === 'LI') {
            // Toggle the 'completed' class for marking as done.
            event.target.classList.toggle('completed');
        }
        
        // Check if the clicked element is the remove button
        if (event.target.classList.contains('remove-btn')) {
            // Remove the parent li element
            event.target.parentNode.remove();
        }
    });

});