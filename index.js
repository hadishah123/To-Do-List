const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const prioritySelectEl = document.querySelector(".priority-select");
const ulEl = document.querySelector(".list");
const themeToggleBtn = document.querySelector(".theme-toggle");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

// Define themes in a list
const themes = ["light", "dark", "blue", "purple"];

// Check if there's a saved theme in localStorage, else default to light
let currentThemeIndex = localStorage.getItem("themeIndex") || 0;
currentThemeIndex = parseInt(currentThemeIndex, 10);  // Ensure it is a number
document.body.setAttribute("data-theme", themes[currentThemeIndex]);

// Theme toggle functionality
themeToggleBtn.addEventListener("click", () => {
  // Change to the next theme in the list
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[currentThemeIndex]);

  // Save the selected theme index to localStorage
  localStorage.setItem("themeIndex", currentThemeIndex);
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

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

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);
  
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

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

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
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
