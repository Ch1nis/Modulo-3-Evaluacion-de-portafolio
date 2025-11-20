// Cargar tareas desde localStorage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guardar tareas
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Agregar tarea
function addTask(descriptionTask) {
  const Task = {
    id: crypto.randomUUID(),
    description: descriptionTask,
    timestamp: new Date().toLocaleString()
  };
  tasks.push(Task);
  saveTasks();
}

// Eliminar una tarea por ID
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
  }
}

// Eliminar todas las tareas
function deleteAllTasks() {
  tasks.length = 0;
  saveTasks();
}

// Listar todas las tareas
function listTasks() {
  return tasks;
}

export { addTask, deleteTask, deleteAllTasks, listTasks };
