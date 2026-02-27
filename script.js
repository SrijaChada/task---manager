// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="priority-${task.priority}">
                ${task.name} (${task.priority})
            </span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");

    const taskName = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskName === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks.push({ name: taskName, priority });
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newName = prompt("Edit task", tasks[index].name);
    if (newName !== null && newName.trim() !== "") {
        tasks[index].name = newName.trim();
        saveTasks();
        renderTasks();
    }
}

// Initial render
renderTasks();