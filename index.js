const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const prioritySelectEl = document.querySelector(".priority-select");
const ulEl = document.querySelector(".list");
const themeToggleBtn = document.querySelector(".theme-toggle");

let list = JSON.parse(localStorage.getItem("list")) || [];

// Load tasks from localStorage
list.forEach((task) => {
  toDoList(task);
});

// Define themes
const themes = ["light", "dark", "blue", "purple"];
let currentThemeIndex = parseInt(localStorage.getItem("themeIndex")) || 0;

// Apply the saved theme
document.body.setAttribute("data-theme", themes[currentThemeIndex]);

// Toggle themes
themeToggleBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[currentThemeIndex]);
  localStorage.setItem("themeIndex", currentThemeIndex);
});

// Form submission
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  addTask(); // Add the task
});

// Handle "Enter" key press on the input field
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior (like form submission)
    addTask(); // Add the task
  }
});

// Function to add a task
function addTask() {
  const newTask = inputEl.value.trim();
  const taskPriority = prioritySelectEl.value;

  if (!newTask) return; // Don't add empty tasks

  toDoList({ name: newTask, priority: taskPriority });
  inputEl.value = ""; // Clear the input field
  inputEl.focus(); // Refocus the input field
}

// Create and display the To-Do item
function toDoList(task) {
  const liEl = document.createElement("li");
  liEl.classList.add(task.priority);
  if (task.checked) {
    liEl.classList.add("checked");
  }
  liEl.innerText = task.name;
  ulEl.appendChild(liEl);

  // Create buttons
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  // Event listeners for buttons
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

// Save to localStorage
function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText.replace("✔", "").trim(), // Clean task name
      checked: liEl.classList.contains("checked"),
      priority: liEl.classList.contains("high")
        ? "high"
        : liEl.classList.contains("medium")
        ? "medium"
        : "low",
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}