// Import
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { populateEditForm } from "./editTasks";
import { database } from "./firebaseConfig";
import { openDeleteModal, openEditModal } from "./modal";
import toggleCompletion from "./toggleCompletion";

const renderTasks = async (tasks = "all") => {
  const tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";
  let renderCollection;
  if ((tasks = "all")) {
    const taskCollection = collection(database, "tasks");
    const q = query(taskCollection, orderBy("createdAt"));
    const tasksSnapshot = await getDocs(q);
    renderCollection = tasksSnapshot.docs;
  } else {
    renderCollection = tasks;
  }

  if (renderCollection.length === 0) {
    const emptyCollectionRow = document.createElement("tr");
    const emptyCollectionCell = document.createElement("td");
    emptyCollectionCell.textContent = "No tasks found";
    tableBody.classList.add("table__body--empty");
    tableBody.append(emptyCollectionRow);
    emptyCollectionRow.append(emptyCollectionCell);
    return;
  } else {
    tableBody.classList.remove("table__body--empty");
  }

  renderCollection.forEach((doc, index) => {
    const task = doc.data();
    // creating elements
    const tableRow = document.createElement("tr");
    const taskNumber = document.createElement("td");
    const taskTitle = document.createElement("td");
    const taskDate = document.createElement("td");
    const taskTime = document.createElement("td");
    const taskCategory = document.createElement("td");
    const taskPriority = document.createElement("td");
    const taskTools = document.createElement("td");
    const crossTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");
    const editTaskButton = document.createElement("button");
    // append elements
    tableBody.append(tableRow);
    tableRow.append(
      taskNumber,
      taskTitle,
      taskDate,
      taskTime,
      taskCategory,
      taskPriority,
      taskTools
    );
    taskTools.append(crossTaskButton, deleteTaskButton, editTaskButton);
    // populate the elements with task's details
    taskNumber.textContent = index + 1;
    taskTitle.textContent = task.title;
    taskDate.textContent = task.date;
    taskTime.textContent = task.time ? task.time : "－";
    taskCategory.textContent = task.category;
    taskPriority.textContent = task.priority;
    crossTaskButton.innerHTML = "<i class='fa-solid fa-check'></i>";
    deleteTaskButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
    editTaskButton.innerHTML = "<i class='fa-solid fa-edit'></i>";
    // add classnames
    task.isCompleted && tableRow.classList.add("task--completed");
    tableRow.classList.add("table__body-row");
    taskNumber.classList.add("table__body-number");
    taskTitle.classList.add("table__body-title");
    taskDate.classList.add("table__body-date");
    taskTime.classList.add("table__body-time");
    taskCategory.classList.add("table__body-category");
    taskPriority.classList.add("table__body-priority");
    taskTools.classList.add("table__body-tools");
    crossTaskButton.classList.add("tools__button");
    deleteTaskButton.classList.add("tools__button");
    editTaskButton.classList.add("tools__button");
    // add event listeners
    crossTaskButton.addEventListener("click", () => {
      toggleCompletion(doc.id, tableRow);
    });
    deleteTaskButton.addEventListener("click", () => {
      openDeleteModal(doc.id, task.title);
    });
    editTaskButton.addEventListener("click", () => {
      openEditModal();
      populateEditForm(doc.id);
    });
  });
};
export default renderTasks;
