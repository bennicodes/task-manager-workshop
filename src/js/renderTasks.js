import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "./firebaseConfig";

const renderTasks = async (tasks = "all") => {
  const tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";

  let renderCollection;

  if (tasks === "all") {
    const taskCollection = collection(database, "tasks");
    const q = query(taskCollection, orderBy("createdAt"));
    const tasksSnapshot = await getDocs(q);
    renderCollection = tasksSnapshot.docs;
  } else {
    renderCollection = tasks;
  }

  // Render tasks in the table
  renderCollection.forEach((doc, index) => {
    const task = doc.data();
    console.log(task);

    // Creating elements
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

    // Append elements
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

    // Populate elements with task details
    taskNumber.textContent = index + 1;
    taskTitle.textContent = task.title;
    taskDate.textContent = task.date;
    taskTime.textContent = task.time ? task.time : "➖";
    taskCategory.textContent = task.category;
    taskPriority.textContent = task.priority;
    crossTaskButton.innerHTML = "<i class='fa-solid fa-check'></i>";
    deleteTaskButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    editTaskButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";

    // Add class names
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
  });
};

export default renderTasks;
