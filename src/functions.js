export let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];



export class TodoItem {
  constructor(title, description, dueDate, priority, checkbox, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkbox = checkbox;
    this.project = project;
  }
}

export function createElementWithId(tag, id) {
  const element = document.createElement(tag);
  element.id = id;
  return element;
}

export function createElementWithTextContent(tag, textContent) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
}

export function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

export function toggleActiveClass(event) {
  const navItems = event.target.parentElement.children;
  for (const item of navItems) {
    item.classList.remove("active");
  }
  event.target.classList.add("active");
}

export function removeFromTasks() {
  // Get a list of all the elements with the class '.task'
  const taskElements = document.querySelectorAll('.task');
  // Loop through the list of elements and remove each one
  taskElements.forEach(taskElement => taskElement.remove());
}


export function validateName(name) {
  const regex = /^[a-zA-Z-' ]*$/;
  return regex.test(name);
}
export function createTaskItem() {
  // Use template literals to build the task HTML string
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  const project = document.querySelector(".active");
  const task = new TodoItem(
    title,
    description,
    dueDate,
    priority,
    false,
    project.textContent
  );

  // Retrieve the existing items from local storage

  // Add the new item to the array
  todoItems.push(task);

  // Store the updated array back in local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  return task;
}

export function createTaskElement(item) {
  const taskHtml = `
  <div class="task ${item.priority}">
    <div class="title">
      <input type="checkbox" id="checkbox" name="checkbox">
      <span class="task-title">${(item.title)}</span>
      <span id="arrow">⬇️</span>
    </div>
    <div class="task-description hidden">${(item.description)}</div>
    <div class="task-due-date hidden">Due in: ${(item.dueDate)}</div>
    <div class="remove-button">Remove 🚮</div>
  </div>
`;

  const fragment = document.createRange().createContextualFragment(taskHtml);
  // Use a fragment to create the task element, The createContextualFragment method is used to create a fragment from an HTML string.
  // A fragment is a lightweight version of the Document object that can be used to build up a DOM structure in memory, without adding it to the actual document.
  const taskDiv = fragment.querySelector(".task");
  return taskDiv;
  // The querySelector method is used to select an element within the fragment, and the appendChild method
  // is used to add the element to the DOM. This allows you to efficiently build and add a DOM structure to the document.
}
export function addTaskToDom(taskDiv) {
  const h2 = document.querySelector("#tasks");
  h2.appendChild(taskDiv);
}
// const task = createTaskItem()

export function createTaskDisplay(item) {
  const taskElement = createTaskElement(item);
  addTaskToDom(taskElement);
}

export function todoItemsProject() {
  const activeItem = document.querySelector('.active');
  const activeTextContent = activeItem.textContent;

  const projects = new Set();
  todoItems.forEach(({ project }) => projects.add(project));

  for (const project of projects) {
    if (project !== "Default") {
      addNewProjectElement(project);
    }
    if (project === activeTextContent) {
      todoItems
        .filter(({ project: itemProject }) => itemProject === activeTextContent)
        .forEach(createTaskDisplay);
    }
  }
}

export function addNewProjectElement(newProjectName){
  const newProjectElement = document.createElement("p");
  newProjectElement.textContent = newProjectName;
  const projectsContainer = document.querySelector("#projects");
  projectsContainer.appendChild(newProjectElement);
}



export function removeTodoItem(event) {
  if (event.target.classList.contains("remove-button")) {
    const taskElement = event.target.parentElement;
    const taskTitleElement = taskElement.querySelector(".task-title");
    const taskTitle = taskTitleElement.textContent;
    console.log(taskTitle);

    // remove the task from the todoItems array
    console.log(todoItems);
    todoItems = todoItems.filter(item => item.title !== taskTitle);
    // store the updated todoItems array in localStorage
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    console.log(todoItems);
    taskElement.remove();
  }
}
