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

  // Call to create the new task
  toDoList(); 

  // Refocus the input field to avoid losing focus
  inputEl.focus(); 
});

// Create and display the To-Do item
function toDoList(task) {
  let newTask = inputEl.value;
  let taskPriority = prioritySelectEl.value;

  if (task) {
    newTask = task.name;
    taskPriority = task.priority;
  }

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.classList.add(taskPriority);
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";

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
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); 
  toDoList(); 
  setTimeout(() => {
    inputEl.focus(); // Focus with a slight delay
  }, 10); 
});
