import { getMode } from "..";
import { activeView } from "./activeView";
import { addClassComplete } from "./addClasses";
import { clearContentArea } from "./clearContent";
import { showDueToday, showDueWeek, showCategory } from "./filteredTasks";
import { populateStorageFirebase } from "./firestore";
import { createEditTaskModal } from "./modal";
import showAllTasks from "./showAllTasks";
import { populateStorage } from "./storage";

const tasks = [];

const createTask = () => {
  const taskFactory = (
    category,
    title,
    description,
    dueDate,
    priority,
    notes,
    status
  ) => ({
    category,
    title,
    description,
    dueDate,
    priority,
    notes,
    status,

    toggleStatus() {
      this.status === "open" ? (this.status = "done") : (this.status = "open");
    },

    spliceTask(objectID) {
      tasks.splice(objectID, 1);
    },

    editProperties(
      currentCategory,
      currentTitle,
      currentDescription,
      currentDueDate,
      currentPriority,
      currentNotes
    ) {
      this.category = currentCategory;
      this.title = currentTitle;
      this.description = currentDescription;
      this.dueDate = currentDueDate;
      this.priority = currentPriority;
      this.notes = currentNotes;
    },
  });

  const category = document.getElementById("categoryInput");
  const title = document.getElementById("titleInput");
  const description = document.getElementById("descriptionInput");
  const dueDate = document.getElementById("dueDateInput");
  const priority = document.getElementById("priorityInput");
  const notes = document.getElementById("notesInput");

  const newTask = taskFactory(
    category.value.toLowerCase(),
    title.value,
    description.value,
    dueDate.value,
    priority.value,
    notes.value,
    "open"
  );
  tasks.push(newTask);
  // Assign ID to task DOM-Element corresponding to it's position in the tasks-array
  const newTaskID = tasks.indexOf(newTask);
  newTask.id = newTaskID;

  getMode() === "offline" ? populateStorage() : populateStorageFirebase();
};

const deleteTask = (objectID) => {
  tasks[objectID].spliceTask(objectID);

  updateObjectID();
  clearContentArea();
  getMode() === "offline" ? populateStorage() : populateStorageFirebase();

  return activeView === "dueToday"
    ? showDueToday(tasks)
    : activeView === "dueWeek"
    ? showDueWeek(tasks)
    : activeView.id === "all"
    ? showAllTasks()
    : showCategory(activeView);
};

const markTaskComplete = (objectID) => {
  tasks[objectID].toggleStatus();
  addClassComplete(objectID);
  getMode() === "offline" ? populateStorage() : populateStorageFirebase();
};

const retrieveTaskDetails = (objectID) => {
  const obj = tasks[objectID];
  const currentCategory = obj.category;
  const currentTitle = obj.title;
  const currentDescription = obj.description;
  const currentDueDate = obj.dueDate;
  const currentPriority = obj.priority;
  const currentNotes = obj.notes;
  createEditTaskModal(
    objectID,
    currentCategory,
    currentTitle,
    currentDescription,
    currentDueDate,
    currentPriority,
    currentNotes
  );
};

// Update task DOM Element ID, when the tasks-array is modified
const updateObjectID = () => {
  tasks.forEach((task) => {
    task.id = tasks.indexOf(task);
  });
};

const clearTasks = () => {
  tasks.length = 0;
};

export {
  tasks,
  createTask,
  deleteTask,
  markTaskComplete,
  retrieveTaskDetails,
  clearTasks,
};
