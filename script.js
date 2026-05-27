let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filteredTasks = [...tasks];

let currentPage = 1;
let rowsPerPage = 5;
let editIndex = null;

// ADD TASK
function addTask() {
  let name = document.getElementById("name").value;
  let task = document.getElementById("task").value;
  let time = document.getElementById("time").value;
  let address = document.getElementById("address").value;

  if (!name || !task) return alert("Fill required fields");

  tasks.push({ name, task, time, address, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  clearInputs();
  applySearchAndFilter();
}

// SEARCH + FILTER
function applySearchAndFilter() {
  let value = document.getElementById("search").value.toLowerCase();
  let type = document.getElementById("statusFilter").value;

  filteredTasks = tasks.filter(t => {
    let matchSearch =
      t.name.toLowerCase().includes(value) ||
      t.task.toLowerCase().includes(value);

    let matchStatus =
      type === "all" ||
      (type === "completed" && t.completed) ||
      (type === "pending" && !t.completed);

    return matchSearch && matchStatus;
  });

  currentPage = 1;
  displayTasks();
}

// DISPLAY TASKS
function displayTasks() {
  let table = document.getElementById("taskTable");
  table.innerHTML = "";

  let start = (currentPage - 1) * rowsPerPage;
  let paginated = filteredTasks.slice(start, start + rowsPerPage);

  paginated.forEach((item, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${item.name}</td>
      <td class="${item.completed ? 'completed' : ''}">${item.task}</td>
      <td>${item.time}</td>
      <td>${item.address}</td>
      <td>
        <button onclick="toggleComplete(${start + index})">
          ${item.completed ? "✅" : "❌"}
        </button>
      </td>
      <td>
        <button onclick="openEdit(${start + index})">✏️</button>
        <button onclick="deleteTask(${start + index})">🗑️</button>
      </td>
    `;

    table.appendChild(row);
  });

  updatePagination();
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  applySearchAndFilter();
}

// COMPLETE
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  applySearchAndFilter();
}

// PAGINATION
function updatePagination() {
  let pageInfo = document.getElementById("pageInfo");
  let totalPages = Math.ceil(filteredTasks.length / rowsPerPage);

  pageInfo.innerText = `Page ${currentPage} of ${totalPages || 1}`;
}

function nextPage() {
  let totalPages = Math.ceil(filteredTasks.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayTasks();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTasks();
  }
}

// EDIT MODAL
function openEdit(index) {
  editIndex = index;
  document.getElementById("editTaskInput").value = tasks[index].task;
  document.getElementById("editModal").style.display = "block";
}

function saveEdit() {
  let newTask = document.getElementById("editTaskInput").value;
  tasks[editIndex].task = newTask;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
  applySearchAndFilter();
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// CLEAR INPUT
function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("task").value = "";
  document.getElementById("time").value = "";
  document.getElementById("address").value = "";
}

// INIT
window.onload = () => applySearchAndFilter();




// 1. Where you used JavaScript (in YOUR code)
// 👉 A. Add Task

// From your file:

// function addTask() {
//   let name = document.getElementById("name").value;
//   ...
//   tasks.push({ name, task, time, address, completed: false });
// }

// ✅ Why used?

// To take input from user

// To store data in array

// To update UI

// 👉 Without JavaScript → button will do NOTHING ❌

// 👉 B. Search + Filter
// function applySearchAndFilter() {
//   filteredTasks = tasks.filter(t => { ... });
// }

// ✅ Why used?

// To find specific tasks

// To filter completed/pending

// 👉 Without JavaScript → search box useless ❌

// 👉 C. Display Data (Dynamic Table)
// function displayTasks() {
//   let row = document.createElement("tr");
// }

// ✅ Why used?

// To show tasks in table dynamically

// 👉 Without JavaScript → table always empty ❌

// 👉 D. Delete Task
// function deleteTask(index) {
//   tasks.splice(index, 1);
// }

// ✅ Why used?

// To remove data

// 👉 Without JavaScript → delete button useless ❌

// 👉 E. Complete Task
// tasks[index].completed = !tasks[index].completed;

// ✅ Why used?

// Toggle status (Done / Pending)

// 👉 Without JS → cannot mark complete ❌

// 👉 F. LocalStorage (VERY IMPORTANT)
// localStorage.setItem("tasks", JSON.stringify(tasks));

// ✅ Why used?

// Save data permanently in browser

// 👉 Without JS → data lost after refresh ❌

// 👉 G. Edit Task (Modal)
// function openEdit(index) { ... }
// function saveEdit() { ... }

// ✅ Why used?

// Update existing task

// 👉 Without JS → editing impossible ❌

// 👉 H. Pagination
// let start = (currentPage - 1) * rowsPerPage;

// ✅ Why used?

// Handle large data

// Show limited rows

// 👉 Without JS → all data messy ❌

// 🎯 2. WHY we use JavaScript in this app

// 👉 JavaScript = Brain of your app

// Without JS ❌	With JS ✅
// Static page	Dynamic app
// No interaction	Full interaction
// No data storage	Data saved
// No logic	Smart behavior
// 💣 3. If you DON'T use JavaScript

// 👉 Your app becomes ONLY HTML + CSS:

// ❌ Cannot add task

// ❌ Cannot delete

// ❌ Cannot search

// ❌ Cannot store data

// ❌ Cannot update UI

// 👉 Basically:

// 💬 "It becomes just a design, not an application"

// 🧠 Simple Example

// HTML:

// <button>Add</button>

// 👉 Without JS → just button
// 👉 With JS → real working feature