import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api";
import { taskSchema } from "./types";
import type { Task } from "./types";

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: number) => ["tasks", id] as const,
} as const;

export const useTasks = () =>
  useQuery({
    queryKey: taskKeys.all,
    queryFn: taskApi.getAll,
    // Parse through Zod schema — strips userId, fills priority default "medium"
    select: (data): Task[] => data.map((item) => taskSchema.parse(item)),
  });
