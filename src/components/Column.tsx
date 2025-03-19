import React, { useState } from "react";

interface Task {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: "todo" | "inProgress" | "complete";
  deadline: string;
}

interface ColumnProps {
  category: "todo" | "inProgress" | "complete";
  tasks: Task[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    category: "todo" | "inProgress" | "complete"
  ) => void;
  editTask: (
    category: "todo" | "inProgress" | "complete",
    taskId: number,
    newName: string,
    newDescription: string
  ) => void;
  deleteTask: (
    category: "todo" | "inProgress" | "complete",
    taskId: number
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  category,
  tasks,
  handleDragStart,
  handleDrop,
  editTask,
  deleteTask,
}) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  return (
    <div
      className="w-1/3 p-4 bg-white shadow-md rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, category)}>
      <h2 className="text-lg font-semibold text-blue-600 mb-3 capitalize">
        {category.replace("inProgress", "In Progress")}
      </h2>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            className="p-3 bg-blue-200 text-blue-900 rounded-md shadow cursor-pointer flex justify-between items-center">
            {editMode === task.id ? (
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-1 bg-white border rounded"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="p-1 bg-white border rounded w-full mt-1"></textarea>
                <button
                  onClick={() => {
                    editTask(category, task.id, editName, editDescription);
                    setEditMode(null);
                  }}
                  className="mt-2 px-2 py-1 bg-green-500 text-white rounded">
                  Simpan
                </button>
              </div>
            ) : (
              <div>
                <p className="font-semibold">{task.name}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditMode(task.id);
                  setEditName(task.name);
                  setEditDescription(task.description);
                }}
                className="text-blue-600">
                ✏️
              </button>
              <button
                onClick={() => deleteTask(category, task.id)}
                className="text-red-600">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
