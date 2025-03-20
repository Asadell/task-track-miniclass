/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import logoEcode from "../assets/logo-ecode.png";
import ApiInput from "./ApiInput";
import { useApi } from "../context/ApiContext";

interface TaskBarProps {
  tasks: Record<string, any>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TaskBar: React.FC<TaskBarProps> = ({ tasks, setIsModalOpen }) => {
  const { backendUrl } = useApi();
  const totalTasks = Object.values(tasks).flat().length;
  const completedTasks = tasks.done.length;
  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section className="bg-gray-100 rounded-lg p-4 flex items-center justify-between shadow-md mb-3">
      <div className="flex flex-row items-center gap-4">
        <img src={logoEcode} alt="Ecode Logo" className="h-10" />
        <ApiInput />
      </div>

      {backendUrl ? (
        <p className="text-gray-800">http://{backendUrl}/api/</p>
      ) : (
        <p className="text-gray-400">http://example.com/api/</p>
      )}

      <div className="flex items-center gap-2">
        <div className="bg-white flex flex-row items-center gap-2 p-2 rounded-full">
          <div className="w-10 h-10 relative overflow-hidden">
            {" "}
            <CircularProgressbar
              value={percentage}
              strokeWidth={20}
              styles={buildStyles({
                textColor: "black",
                pathColor: "#4CAF50",
                trailColor: "#E0E0E0",
                textSize: "30px",
                strokeLinecap: "round",
              })}
            />
          </div>
          <p className="text-gray-700 text-sm font-semibold pr-1">
            {completedTasks} / {totalTasks} Done
          </p>
        </div>
        <button
          className="px-5 py-2.5 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-all hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}>
          + Tambah Tugas
        </button>
      </div>
    </section>
  );
};

export default TaskBar;
