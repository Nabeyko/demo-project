import { z } from "zod";

export const PRIORITY_VALUES = ["low", "medium", "high"] as const;

export const prioritySchema = z.enum(PRIORITY_VALUES);

export type Priority = z.infer<typeof prioritySchema>;

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean(),
  priority: prioritySchema.default("medium"),
});

export type Task = z.infer<typeof taskSchema>;

export const createTaskSchema = taskSchema.omit({
  id: true,
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;