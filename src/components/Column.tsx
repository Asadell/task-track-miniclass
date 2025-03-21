import React, { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { Task } from "../types/task";
import EditTask from "./EditTask";
import { CheckCircle, Loader, PauseCircle, Pencil, Trash } from "lucide-react";

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
    newPriority: string,
    newStatus: "todo" | "inProgress" | "done"
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
      className={`w-1/3 p-4 shadow-md rounded-lg ${taskStyles[category]}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, category)}>
      <div className="flex flex-row items-center gap-2">
        <h2
          className={`text-lg font-semibold mb-3 capitalize flex items-center gap-2 text-black rounded-full py-1 px-2 w-[30%]
          ${category === "todo" ? "bg-[#E8E8E8]" : ""}
          ${category === "inProgress" ? "bg-[#C8E9FF]" : ""}
          ${category === "done" ? "bg-[#CAF0B9]" : ""}
        `}>
          {category === "todo" && (
            <>
              <PauseCircle size={16} /> To Do
            </>
          )}
          {category === "inProgress" && (
            <>
              <Loader size={16} className="animate-spin" /> In Progress
            </>
          )}
          {category === "done" && (
            <>
              <CheckCircle size={16} className="text-[#6FC349]" /> Done
            </>
          )}
        </h2>
        <p
          className={`text-center text-lg font-semibold mb-3 capitalize gap-2 text-black rounded-full py-1 px-2 w-10
          ${category === "todo" ? "bg-[#E8E8E8]" : ""}
          ${category === "inProgress" ? "bg-[#C8E9FF]" : ""}
          ${category === "done" ? "bg-[#CAF0B9]" : ""}
        `}>
          {tasks.length}
        </p>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            className={`p-3 rounded-md shadow cursor-pointer flex justify-between items-center bg-white`}>
            {editMode === task.id ? (
              <EditTask
                task={task}
                category={category}
                editTask={editTask}
                setEditMode={setEditMode}
              />
            ) : (
              <div className="w-full p-4 bg-white rounded-lg">
                <p className="font-bold text-lg text-gray-800">{task.name}</p>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>

                <div className="flex items-center text-xs text-gray-500 mt-3">
                  <span className="mr-1">🕒</span>
                  <span>{formatDate(task.deadline)}</span>
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      task.priority === "low"
                        ? "bg-green-100 text-green-700"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-col">
              <button
                onClick={() => {
                  setEditMode(task.id);
                }}
                className="text-blue-600 hover:cursor-pointer">
                <Pencil />
              </button>
              <button
                onClick={() => deleteTask(category, task.id)}
                className="text-red-600 hover:cursor-pointer">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const taskStyles = {
  todo: "bg-[#F8F8F8]",
  inProgress: "bg-[#EBF7FC]",
  done: "bg-[#EDF9E8]",
};

export default Column;
