/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApi } from "../context/ApiContext";
import { useApiRequest } from "../lib/axios";
import { Task } from "../types/task";

const useTaskService = () => {
  const api = useApiRequest();
  const { backendUrl } = useApi();

  const getTasksApi = async (): Promise<Task[]> => {
    if (!backendUrl) return [];
    try {
      const response = await api.get<{ data: Task[] }>("/tasks");

      return response.data.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

  const getTaskByIdApi = async (id: number): Promise<Task> => {
    try {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

  const createTaskApi = async (taskData: Omit<Task, "id">): Promise<Task> => {
    try {
      const response = await api.post<{ data: Task }>("/tasks", taskData);
      return response.data.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

  const updateTaskApi = async (
    id: number,
    taskData: Partial<Task>
  ): Promise<Task> => {
    try {
      const response = await api.put<Task>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

  const deleteTaskApi = async (
    id: number
  ): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.delete<{ status: string; message: string }>(
        `/tasks/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

  return {
    getTasksApi,
    getTaskByIdApi,
    createTaskApi,
    updateTaskApi,
    deleteTaskApi,
  };
};

export default useTaskService;
