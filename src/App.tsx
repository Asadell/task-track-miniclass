import React, { useState } from "react";
import Column from "./components/Column";
import Modal from "./components/Modal";

interface Task {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: "todo" | "inProgress" | "complete";
  deadline: string;
}

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  complete: Task[];
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    inProgress: [],
    complete: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

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

  const addTask = (name: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      slug: generateSlug(name),
      description,
      status: "todo",
      deadline: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));

    setIsModalOpen(false);
  };

  const editTask = (
    category: keyof Tasks,
    taskId: number,
    newName: string,
    newDescription: string
  ) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].map((t) =>
        t.id === taskId
          ? {
              ...t,
              name: newName,
              slug: generateSlug(newName),
              description: newDescription,
            }
          : t
      ),
    }));
  };

  const deleteTask = (category: keyof Tasks, taskId: number) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t.id !== taskId),
    }));
  };

  return (
    <div className="flex flex-col items-center p-5 bg-blue-100 min-h-screen">
      <button
        className="mb-5 px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}>
        + Tambah Tugas
      </button>

      <div className="flex gap-4 w-full">
        {Object.keys(tasks).map((category) => (
          <Column
            key={category}
            category={category as keyof Tasks}
            tasks={tasks[category as keyof Tasks]}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} addTask={addTask} />
      )}
    </div>
  );
};

export default App;
