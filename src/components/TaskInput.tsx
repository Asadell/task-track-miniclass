import React, { useState } from "react";

interface TaskInputProps {
  category: "todo" | "inProgress" | "complete";
  addTask: (
    category: "todo" | "inProgress" | "complete",
    taskName: string
  ) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ category, addTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(category, task);
      setTask("");
    }
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Tambah tugas..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleAddTask}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">
        Tambah
      </button>
    </div>
  );
};

export default TaskInput;
