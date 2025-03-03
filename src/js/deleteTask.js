import { deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";

const deleteTask = async (id) => {
  // Delete task from Firestore
  try {
    const taskToDelete = doc(database, "tasks", id);
    await deleteDoc(taskToDelete);
    renderTasks();
  } catch (error) {
    console.log(error, "error deleting task");
  }
};
export default deleteTask;
