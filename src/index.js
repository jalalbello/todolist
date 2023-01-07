import "./css/styles.css";
import "./css/form.css";
import "./css/todos.css";

import {
  validateName,
  createTaskDisplay,
  createTaskItem,
  removeFromTasks,
  todoItems,
  todoItemsProject,
  addNewProjectElement,
  removeTodoItem,
  TodoItem
} from "./functions.js";


// Creating a project
const addProjectButton = document.getElementById("addProject");

// Creating a project
addProjectButton.addEventListener("click", (event) => {
  const newProjectName = prompt("Enter new project");

  // Check if project name is already in use
  const activeProjectElements = parentElement.querySelectorAll("p");
  const projectNameInUse = Array.from(activeProjectElements).some(
    (element) => element.textContent === newProjectName
      // Array.from() is used to convert the NodeList into an array.
  // The some() method is used to check if any of the elements in the array match the condition.
  // The condition is that the textContent of the element is equal to the newProjectName.
  );
  if (projectNameInUse) {
    alert("Project name already in use. Please choose a different name.");
    return;
  }

  // Validate project name
  if (!validateName(newProjectName)) {
    alert("Only letters and white space allowed in project name.");
    return;
  }

  // Create new project element and add it to the page
  addNewProjectElement(newProjectName)
});


const parentElement = document.querySelector("#sidebar");
parentElement.addEventListener("click", (event) => {
  if (event.target.matches("p")) {
    if (!event.target.classList.contains("active")) {
      // remove the other classes with .active
      const activeElements = parentElement.querySelectorAll(".active");
      activeElements.forEach((element) => {
        element.classList.remove("active");
      });
      removeFromTasks();

      todoItems.forEach((item) => {
        if (item.project === event.target.textContent) {
          // do something specific
          createTaskDisplay(item);
        }
      });

      event.target.classList.toggle("active");
    }
  }
});
const form = document.getElementById("task-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = createTaskItem();
  createTaskDisplay(task);
});

const tasksElement = document.querySelector("#tasks");
tasksElement.addEventListener("click", function (event) {
  // Check if the clicked element has the id "#arrow"
  if (event.target.id === "arrow") {
    // Get the task element
    const taskElement = event.target.parentElement.parentElement;
    // Trigger a click event on the task element
    taskElement.click();
  }
  // Check if the clicked element has the class ".task"
  if (event.target.classList.contains("task")) {
    // Get the task title element
    const taskTitleElement = event.target.firstElementChild;
    // Toggle the visibility of the other elements
    const descriptionElement = taskTitleElement.nextElementSibling;
    const dueDateElement = descriptionElement
      ? descriptionElement.nextElementSibling
      : null;
    // Toggle the visibility of the other elements
    if (descriptionElement) {
      descriptionElement.classList.toggle("hidden");
    }
    if (dueDateElement) {
      dueDateElement.classList.toggle("hidden");
    }
    const arrow = event.target.querySelector("#arrow");
    if (arrow.textContent === "⬆️") {
      arrow.textContent = "⬇️";
    } else {
      arrow.textContent = "⬆️";
    }
  }
});

tasksElement.addEventListener("click", removeTodoItem);

todoItemsProject();
