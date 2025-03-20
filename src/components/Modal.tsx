import React, { useState } from "react";

const Modal: React.FC<{
  onClose: () => void;
  addTask: (
    name: string,
    description: string,
    deadline: string,
    priority: string
  ) => void;
}> = ({ onClose, addTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-md"
      onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tambah Tugas
        </h2>

        <input
          type="text"
          placeholder="Nama tugas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"></textarea>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="w-full p-2 border rounded mb-4">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 hover:cursor-pointer">
            Batal
          </button>
          <button
            onClick={() => {
              if (name.trim() && deadline.trim()) {
                addTask(name, description, deadline, priority);
                setName("");
                setDescription("");
                setDeadline("");
                setPriority("medium");
                onClose();
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer">
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
