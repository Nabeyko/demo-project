import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "./task.api";
import { taskKeys } from "../model/use-tasks";
import type { Task } from "../model/types";

export const useToggleTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskApi.toggle(task.id, !task.completed),

    onMutate: async (task: Task) => {
      // 1. Cancel any in-flight refetches so they don't overwrite our update
      await queryClient.cancelQueries({ queryKey: taskKeys.all });

      // 2. Snapshot the current cache for rollback
      const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.all);

      // 3. Optimistically flip the completed flag — instant UI feedback
      queryClient.setQueryData<Task[]>(taskKeys.all, (prev) =>
        prev?.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t,
        ),
      );

      return { previousTasks };
    },

    onError: (_err, _task, context) => {
      // Rollback to the snapshot on network/server error
      if (context?.previousTasks !== undefined) {
        queryClient.setQueryData<Task[]>(taskKeys.all, context.previousTasks);
      }
    },

    // Note: we intentionally skip invalidateQueries here because
    // JSONPlaceholder does not persist PATCH — a refetch would undo the toggle.
    // In a real API, add: onSettled: () => queryClient.invalidateQueries(...)
  });
};
