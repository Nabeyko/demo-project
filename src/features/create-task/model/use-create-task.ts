import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/entities/task/api";
import { taskKeys } from "@/entities/task/model";
import type { CreateTaskDto, Task } from "@/entities/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateTaskDto): Promise<Task> => {
      await taskApi.create({ title: dto.title, completed: dto.completed });
      const [tempId] = crypto.getRandomValues(new Uint32Array(1));

      return {
        id: tempId!,
        title: dto.title,
        completed: dto.completed,
        priority: dto.priority,
      };
    },

    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(taskKeys.all, (prev) =>
        prev ? [newTask, ...prev] : [newTask],
      );
    },
  });
};
