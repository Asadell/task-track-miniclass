import { Task } from "../types/task";

const API_URL = "https://api.example.com/tasks"; // Ganti dengan URL API yang sesuai

export const getTasksFromAPI = async (): Promise<{
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTaskToAPI = async (task: Task) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const updateTaskInAPI = async (
  taskId: number,
  updatedTask: Partial<Task>
) => {
  await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
};

export const deleteTaskFromAPI = async (taskId: number) => {
  await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
};
