export interface Task {
  id: number;
  name: string;
  description: string;
  status: "todo" | "inProgress" | "done";
  deadline: string;
  priority: string;
}
