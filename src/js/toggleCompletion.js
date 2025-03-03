import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";
// import renderTasks from "./renderTasks";

const toggleCompletion = async (id, tableRow) => {
  // Update task in Firestore
  try {
    const taskToComplete = doc(database, "tasks", id);
    const taskSnapshot = await getDoc(taskToComplete);
    const currentStateCompletedState = taskSnapshot.data().isCompleted;
    const updatedIsCompletedProperty = !currentStateCompletedState;

    await updateDoc(taskToComplete, {
      isCompleted: updatedIsCompletedProperty,
    });
    if (updatedIsCompletedProperty) {
      tableRow.classList.add("task--completed");
    } else {
      tableRow.classList.remove("task--completed");
    }
  } catch (error) {
    console.log(error, "error updating task");
  }
};
export default toggleCompletion;
