import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { useTasks, TaskCard } from "@/entities/task";
import { filterAtom } from "@/features/filter-tasks";
import { TaskSkeleton } from "./TaskSkeleton";
import type { Task } from "@/entities/task";
import type { FilterValue } from "@/features/filter-tasks";

const applyFilter = (tasks: Task[], filter: FilterValue): Task[] => {
  switch (filter) {
    case "active":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const filter = useAtomValue(filterAtom);

  const filteredTasks = useMemo(
    () => applyFilter(tasks ?? [], filter),
    [tasks, filter],
  );

  if (isLoading) {
    return <TaskSkeleton count={6} />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
      >
        Failed to load tasks:{" "}
        <span className="font-medium">{error?.message ?? "Unknown error"}</span>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400">
        No tasks found for the <strong>{filter}</strong> filter.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
};
