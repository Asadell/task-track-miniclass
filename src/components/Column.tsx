import React, { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { Task } from "../types/task";
import EditTask from "./EditTask";

interface ColumnProps {
  category: "todo" | "inProgress" | "done";
  tasks: Task[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    category: "todo" | "inProgress" | "done"
  ) => void;
  editTask: (
    category: "todo" | "inProgress" | "done",
    taskId: number,
    newName: string,
    newDescription: string,
    newDeadline: string,
    newPriority: string
  ) => void;
  deleteTask: (
    category: "todo" | "inProgress" | "done",
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

  return (
    <div
      className="w-1/3 p-4 bg-white shadow-md rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, category)}>
      <h2 className="text-lg font-semibold text-blue-600 mb-3 capitalize">
        {category === "todo" && "📌 To Do"}
        {category === "inProgress" && "⏳ In Progress"}
        {category === "done" && "✅ done"}
      </h2>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            className={`p-3 rounded-md shadow cursor-pointer flex justify-between items-center ${taskStyles[category]}`}>
            {editMode === task.id ? (
              <EditTask
                task={task}
                category={category}
                editTask={editTask}
                setEditMode={setEditMode}
              />
            ) : (
              <div className="w-full">
                <p className="font-semibold text-lg">{task.name}</p>
                <p className="text-sm text-gray-600">{task.description}</p>

                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span className="mr-1">🕒</span>
                  <span>{formatDate(task.deadline)}</span>
                </div>

                <div className="flex items-center text-xs font-semibold mt-2">
                  <span>⚡ Prioritas: </span>
                  <span
                    className={`ml-1 px-2 py-1 rounded-full text-white text-xs 
                      ${
                        task.priority === "low"
                          ? "bg-green-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditMode(task.id);
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

const taskStyles = {
  todo: "bg-red-100 text-red-900 border border-red-300",
  inProgress: "bg-yellow-100 text-yellow-900 border border-yellow-300",
  done: "bg-green-100 text-green-900 border border-green-300",
};

export default Column;
