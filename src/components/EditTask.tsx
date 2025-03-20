import React, { useState } from "react";
import { Task } from "../types/task";

interface EditTaskProps {
  task: Task;
  category: "todo" | "inProgress" | "done";
  editTask: (
    category: "todo" | "inProgress" | "done",
    taskId: number,
    newName: string,
    newDescription: string,
    newDeadline: string,
    newPriority: string
  ) => void;
  setEditMode: (value: number | null) => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  task,
  category,
  editTask,
  setEditMode,
}) => {
  const [editName, setEditName] = useState(task.name);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState<string>(task.priority);

  return (
    <div>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="p-1 bg-white border rounded w-full mb-2"
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="p-1 bg-white border rounded w-full mb-2"></textarea>

      <input
        type="datetime-local"
        value={editDeadline}
        onChange={(e) => setEditDeadline(e.target.value)}
        className="p-1 bg-white border rounded w-full mb-2"
      />

      <select
        value={editPriority}
        onChange={(e) =>
          setEditPriority(e.target.value as "low" | "medium" | "high")
        }
        className="p-1 bg-white border rounded w-full mb-2">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={() => {
          editTask(
            category,
            task.id,
            editName,
            editDescription,
            editDeadline,
            editPriority
          );
          setEditMode(null);
        }}
        className="mt-2 px-2 py-1 bg-green-500 text-white rounded hover:cursor-pointer">
        Simpan
      </button>
      <button
        onClick={() => setEditMode(null)}
        className="ml-2 px-2 py-1 bg-gray-400 text-white rounded hover:cursor-pointer">
        Batal
      </button>
    </div>
  );
};

export default EditTask;
