document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") return;

    createTaskElement(taskText, false);
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.push({ text: taskText, completed: false });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    taskInput.value = "";
}

function createTaskElement(text, completed) {
    const li = document.createElement("li");
    
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    editBtn.addEventListener("click", () => editTask(li));
    
    deleteBtn.addEventListener("click", () => deleteTask(li));

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
}

function editTask(taskItem) {
   const newTaskText = prompt("Edit your task:", taskItem.firstChild.textContent);
   
   if (newTaskText !== null && newTaskText.trim() !== "") {
       const tasks = JSON.parse(localStorage.getItem("tasks"));
       const index = Array.from(taskList.children).indexOf(taskItem);
       
       tasks[index].text = newTaskText.trim();
       localStorage.setItem("tasks", JSON.stringify(tasks));
       
       taskItem.firstChild.textContent = newTaskText.trim();
   }
}

function deleteTask(taskItem) {
   const tasks = JSON.parse(localStorage.getItem("tasks"));
   const index = Array.from(taskList.children).indexOf(taskItem);
   
   tasks.splice(index, 1);
   localStorage.setItem("tasks", JSON.stringify(tasks));
   
   taskList.removeChild(taskItem);
}

