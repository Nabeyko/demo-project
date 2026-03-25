import { apiClient } from "@/shared/api";
export interface RawTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const taskApi = {
  getAll: (): Promise<RawTask[]> =>
    apiClient.get<RawTask[]>("/todos").then((response) => response.data),

  getById: (id: number): Promise<RawTask> =>
    apiClient.get<RawTask>(`/todos/${id}`).then((response) => response.data),

  create: (
    dto: Pick<RawTask, "title" | "completed">,
  ): Promise<RawTask> =>
    apiClient
      .post<RawTask>("/todos", { ...dto, userId: 1 })
      .then((response) => response.data),

  toggle: (id: number, completed: boolean): Promise<RawTask> =>
    apiClient
      .patch<RawTask>(`/todos/${id}`, { completed })
      .then((response) => response.data),
};