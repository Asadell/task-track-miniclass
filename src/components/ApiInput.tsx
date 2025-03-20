import { Plug, PlugZap } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { motion } from "framer-motion";

const ApiInput = () => {
  const { backendUrl, setBackendUrl } = useApi();

  return (
    <div className="flex flex-row items-center gap-3">
      <label htmlFor="backend-url" className="text-sm font-medium">
        <motion.div
          animate={{ scale: backendUrl ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}>
          {backendUrl ? (
            <Plug className="text-green-500" size={20} />
          ) : (
            <PlugZap className="text-gray-400" size={20} />
          )}
        </motion.div>
      </label>
      <input
        id="backend-url"
        type="text"
        value={backendUrl ?? ""}
        placeholder="localhost:8000"
        onChange={(e) => setBackendUrl(e.target.value)}
        className="p-1 w-60 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
};

export default ApiInput;
