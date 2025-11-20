import { addTask, listTasks, deleteTask, deleteAllTasks } from "./lib/handleTasks.js";

const taskcards = document.getElementById("TasksList");

// Las tareas del DOM
function renderTasks() {
  const tasks = listTasks();
  if (!taskcards) return; 
  taskcards.textContent = "";

  tasks.forEach(task => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-start";

    const content = document.createElement("div");
    content.className = "ms-2 me-auto";

    const title = document.createElement("div");
    title.className = "fw-bold";
    title.textContent = task.description;

    const meta = document.createElement("small");
    meta.className = "text-muted";
    meta.innerHTML = `id: <i>${task.id}</i> — fecha: <i>${task.timestamp}</i>`; 

    content.appendChild(title);
    content.appendChild(meta);

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-danger";
    btn.setAttribute("data-id", task.id);
    btn.type = "button";
    btn.textContent = "Eliminar";

    item.appendChild(content);
    item.appendChild(btn);
    taskcards.appendChild(item);
  });
}

// Espera que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  // Eliminar tarea individual 
  taskcards?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.matches("button.btn-danger[data-id]")) {
      const taskId = target.getAttribute("data-id");
      if (taskId) {
        deleteTask(taskId);
        renderTasks();
      }
    }
  });

  // Eliminar todas las tareas
  document.getElementById("deleteAllTasks")?.addEventListener("click", () => {
    deleteAllTasks();
    renderTasks();
  });

  // Agregar nueva tarea
  const form = document.getElementById("taskForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const description = (taskInput?.value || "").trim();

    if (description) {
      addTask(description);
      if (taskInput) taskInput.value = "";
      renderTasks();
    } else {
      console.warn("Por favor ingresa una descripción para la tarea.");
    }
  });
});
