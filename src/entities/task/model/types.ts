import { z } from "zod";

export const Priority = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export type Task = z.infer<typeof taskSchema>;

export const createTaskSchema = taskSchema
  .omit({ id: true })
  .extend({ priority: z.enum(["low", "medium", "high"]) });

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
