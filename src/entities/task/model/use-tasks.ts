import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api";
import { taskSchema } from "./types";

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: number) => ["tasks", id] as const,
};

export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: taskApi.getAll,
    select: (tasks) => tasks.map((task) => taskSchema.parse(task)),
  });
};
