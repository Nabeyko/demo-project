import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/entities/task/api";
import { taskKeys } from "@/entities/task/model";
import type { CreateTaskDto, Task } from "@/entities/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateTaskDto): Promise<Task> => {
      // Fire the request but ignore the returned id — JSONPlaceholder always
      // returns id: 201, which causes React duplicate-key warnings.
      await taskApi.create({ title: dto.title, completed: dto.completed });

      // Generate a cryptographically random unique id.
      // crypto.randomUUID() returns a string, but Task.id is number,
      // so we use getRandomValues to produce a random 32-bit unsigned integer.
      const [tempId] = crypto.getRandomValues(new Uint32Array(1));

      return {
        id: tempId!,
        title: dto.title,
        completed: dto.completed,
        priority: dto.priority,
      };
    },

    onSuccess: (newTask) => {
      // Prepend to cache. We skip invalidateQueries because JSONPlaceholder
      // does not persist POST — a refetch would lose the new task.
      queryClient.setQueryData<Task[]>(taskKeys.all, (prev) =>
        prev ? [newTask, ...prev] : [newTask],
      );
    },
  });
};
