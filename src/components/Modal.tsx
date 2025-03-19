import React, { useState } from "react";

const Modal: React.FC<{
  onClose: () => void;
  addTask: (name: string, description: string) => void;
}> = ({ onClose, addTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Tutup modal jika klik di luar pop-up
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
          className="w-full p-2 border rounded mb-4"></textarea>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Batal
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                addTask(name, description);
                setName("");
                setDescription("");
                onClose();
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
