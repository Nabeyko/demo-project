import { apiClient } from "@/shared/api";

export interface RawTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const taskApi = {
  getAll: (): Promise<RawTask[]> =>
    apiClient.get<RawTask[]>("/todos").then((r) => r.data),

  getById: (id: number): Promise<RawTask> =>
    apiClient.get<RawTask>(`/todos/${id}`).then((r) => r.data),

  create: (dto: Pick<RawTask, "title" | "completed">): Promise<RawTask> =>
    apiClient
      .post<RawTask>("/todos", { ...dto, userId: 1 })
      .then((r) => r.data),

  toggle: (id: number, completed: boolean): Promise<RawTask> =>
    apiClient
      .patch<RawTask>(`/todos/${id}`, { completed })
      .then((r) => r.data),
};
