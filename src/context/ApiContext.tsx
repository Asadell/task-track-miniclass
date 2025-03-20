import { createContext, useContext, useState, ReactNode } from "react";

interface ApiContextType {
  backendUrl: string | null;
  setBackendUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [backendUrl, setBackendUrl] = useState<string | null>(null);

  return (
    <ApiContext.Provider value={{ backendUrl, setBackendUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
