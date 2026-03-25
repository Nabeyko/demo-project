import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "./task.api";
import { taskKeys } from "../model/use-tasks";
import type { Task } from "../model/types";

export const useToggleTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskApi.toggle(task.id, !task.completed),

    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });

      const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.all);

      queryClient.setQueryData<Task[]>(taskKeys.all, (prev) =>
        prev?.map((taskItem) =>
          taskItem.id === task.id ? { ...taskItem, completed: !taskItem.completed } : taskItem,
        ),
      );

      return { previousTasks };
    },

    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(taskKeys.all, context.previousTasks);
      }
    },
  });
};
