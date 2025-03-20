import { useState } from "react";
import { Task } from "../types/task";

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    inProgress: [],
    done: [],
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id.toString());
    e.dataTransfer.setData("from", task.status);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    category: keyof Tasks
  ) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const from = e.dataTransfer.getData("from") as keyof Tasks;

    if (from !== category) {
      setTasks((prev) => {
        const taskToMove = prev[from].find((t) => t.id === taskId);
        if (!taskToMove) return prev;

        return {
          ...prev,
          [from]: prev[from].filter((t) => t.id !== taskId),
          [category]: [...prev[category], { ...taskToMove, status: category }],
        };
      });
    }
  };

  const addTask = (
    name: string,
    description: string,
    deadline: string,
    priority: string
  ) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      description,
      status: "todo",
      deadline,
      priority,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const editTask = (
    category: keyof Tasks,
    taskId: number,
    newName: string,
    newDescription: string,
    newDeadline: string,
    newPriority: string
  ) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].map((task) =>
        task.id === taskId
          ? {
              ...task,
              name: newName,
              description: newDescription,
              deadline: newDeadline,
              priority: newPriority,
            }
          : task
      ),
    }));
  };

  const deleteTask = (category: keyof Tasks, taskId: number) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t.id !== taskId),
    }));
  };

  return {
    tasks,
    handleDragStart,
    handleDrop,
    addTask,
    editTask,
    deleteTask,
    setTasks,
  };
};

export default useTasks;
