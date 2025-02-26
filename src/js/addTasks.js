import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";

const addTasks = async (title, date, time, category, priority) => {
  try {
    const task = {
      title,
      date,
      time,
      category,
      priority,
      isCompleted: false,
      createdAt: serverTimestamp(),
    };
    console.log(task);

    await addDoc(collection(database, "tasks"), task);
    console.log("task submitted successfully!");
  } catch (error) {
    console.log(error, "Error adding task!");
  }
};

export default addTasks;
