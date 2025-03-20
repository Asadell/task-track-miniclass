import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ApiContextType {
  backendUrl: string | null;
  setBackendUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [backendUrl, setBackendUrlState] = useState<string | null>(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("backendUrl");
    if (storedUrl) {
      setBackendUrlState(storedUrl);
    }
  }, []);

  const setBackendUrl = (url: string) => {
    setBackendUrlState(url);
    localStorage.setItem("backendUrl", url);
  };

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
