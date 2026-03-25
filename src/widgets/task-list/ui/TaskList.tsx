import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Box, Typography, Alert, AlertTitle, Stack } from "@mui/material";
import { useTasks, TaskCard } from "@/entities/task";
import { filterAtom } from "@/features/filter-tasks";
import { TaskSkeleton } from "./TaskSkeleton";
import type { Task } from "@/entities/task";
import type { FilterValue } from "@/features/filter-tasks";

const applyFilter = (tasks: Task[], filter: FilterValue) => {
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.completed);

    case "completed":
      return tasks.filter((task) => task.completed);

    default:
      return tasks;
  }
};

export const TaskList = () => {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const filter = useAtomValue(filterAtom);

  const filteredTasks = useMemo(() => {
    return applyFilter(tasks ?? [], filter);
  }, [tasks, filter]);

  if (isLoading) {
    return <TaskSkeleton count={6} />;
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        variant="outlined"
        sx={{
          borderRadius: 3,
          bgcolor: "error.lighter",
        }}
      >
        <AlertTitle>Failed to load tasks</AlertTitle>
        {error?.message ?? "Unknown error"}
      </Alert>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <Box
        sx={{
          p: 8,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No tasks found for the current filter.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  );
};
