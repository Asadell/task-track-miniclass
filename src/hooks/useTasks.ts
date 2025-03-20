import { useState, useEffect } from "react";
import { Task } from "../types/task";
import useTaskService from "../services/useTaskService";
import { useApi } from "../context/ApiContext";

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const useTasks = () => {
  const { backendUrl } = useApi();
  const { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } =
    useTaskService();
  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    if (backendUrl) {
      getTasksApi()
        .then((fetchedTasks) => {
          const categorizedTasks: Tasks = {
            todo: [],
            inProgress: [],
            done: [],
          };

          const normalizeStatus = (status: string): keyof Tasks => {
            const statusMap: Record<string, keyof Tasks> = {
              todo: "todo",
              inProgress: "inProgress",
              done: "done",
            };
            return statusMap[status] || "todo";
          };

          fetchedTasks.forEach((task) => {
            const normalizedStatus = normalizeStatus(task.status);
            categorizedTasks[normalizedStatus].push(task);
          });

          setTasks(categorizedTasks);
        })
        .catch(console.error);
    }
  }, [backendUrl]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id.toString());
    e.dataTransfer.setData("from", task.status);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    category: keyof Tasks
  ) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const from = e.dataTransfer.getData("from") as keyof Tasks;

    if (from !== category) {
      const taskToMove = tasks[from].find((t) => t.id === taskId);
      if (!taskToMove) return;

      const { name, description, deadline, priority } = taskToMove;

      if (backendUrl) {
        try {
          await updateTaskApi(taskId, {
            name,
            description,
            deadline,
            priority,
            status: category,
          });

          setTasks((prev) => ({
            ...prev,
            [from]: prev[from].filter((t) => t.id !== taskId),
            [category]: [
              ...prev[category],
              { ...taskToMove, status: category },
            ],
          }));
        } catch (error) {
          console.error("Gagal memperbarui status tugas:", error);
        }
      } else {
        setTasks((prev) => ({
          ...prev,
          [from]: prev[from].filter((t) => t.id !== taskId),
          [category]: [...prev[category], { ...taskToMove, status: category }],
        }));
      }
    }
  };

  const addTask = async (
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
    if (backendUrl) {
      try {
        const createdTask = await createTaskApi(newTask);
        setTasks((prev) => ({ ...prev, todo: [...prev.todo, createdTask] }));
      } catch (error) {
        console.error(error);
      }
    } else {
      setTasks((prev) => ({ ...prev, todo: [...prev.todo, newTask] }));
    }
  };

  const editTask = async (
    category: keyof Tasks,
    taskId: number,
    newName: string,
    newDescription: string,
    newDeadline: string,
    newPriority: string,
    newStatus: "todo" | "inProgress" | "done"
  ) => {
    if (backendUrl) {
      try {
        await updateTaskApi(taskId, {
          name: newName,
          description: newDescription,
          deadline: newDeadline,
          priority: newPriority,
          status: newStatus,
        });

        setTasks((prevTasks) => {
          const updatedTasks = prevTasks[category].map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  name: newName,
                  description: newDescription,
                  deadline: newDeadline,
                  priority: newPriority,
                }
              : task
          );
          return { ...prevTasks, [category]: updatedTasks };
        });
      } catch (error) {
        console.error("Gagal mengupdate task:", error);
      }
    } else {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks[category].map((task) =>
          task.id === taskId
            ? {
                ...task,
                name: newName,
                description: newDescription,
                deadline: newDeadline,
                priority: newPriority,
              }
            : task
        );
        return { ...prevTasks, [category]: updatedTasks };
      });
    }
  };

  const deleteTask = async (category: keyof Tasks, taskId: number) => {
    if (backendUrl) {
      try {
        await deleteTaskApi(taskId);

        setTasks((prev) => ({
          ...prev,
          [category]: prev[category].filter((t) => t.id !== taskId),
        }));
      } catch (error) {
        console.error("Gagal menghapus task:", error);
      }
    } else {
      setTasks((prev) => ({
        ...prev,
        [category]: prev[category].filter((t) => t.id !== taskId),
      }));
    }
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
