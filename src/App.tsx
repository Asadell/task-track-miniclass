import { useState } from "react";
import Column from "./components/Column";
import Modal from "./components/Modal";
import { Task } from "./types/task";
import useTasks from "./hooks/useTasks";
import TaskBar from "./components/TaskBar";
import { ApiProvider } from "./context/ApiContext";

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const App = () => {
  return (
    <ApiProvider>
      <AppContent />
    </ApiProvider>
  );
};

const AppContent = () => {
  const { tasks, handleDragStart, handleDrop, addTask, editTask, deleteTask } =
    useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white py-3 px-5 min-h-screen flex flex-col">
      <div className="flex flex-col flex-1 py-3 px-5 bg-white min-w-full h-full rounded-2xl shadow-lg">
        <TaskBar tasks={tasks} setIsModalOpen={setIsModalOpen} />

        <section className="flex gap-4 w-full">
          {Object.keys(tasks).map((category, index) => (
            <Column
              key={index}
              category={category as keyof Tasks}
              tasks={tasks[category as keyof Tasks]}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </section>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} addTask={addTask} />
        )}
      </div>
    </div>
  );
};

export default App;
