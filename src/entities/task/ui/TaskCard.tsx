import { Box, Typography, Card, Stack } from "@mui/material";
import type { Task, Priority } from "../model/types";
import { useToggleTaskStatus } from "../api/task.queries";

interface TaskCardProps {
  task: Task;
}

const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const getPrioritySx = (priority: Priority) => {
  switch (priority) {
    case "low":
      return {
        bgcolor: "#ecfdf5",
        color: "#047857",
        dotColor: "#34d399",
      };

    case "medium":
      return {
        bgcolor: "#fffbeb",
        color: "#b45309",
        dotColor: "#fbbf24",
      };

    case "high":
      return {
        bgcolor: "#fef2f2",
        color: "#b91c1c",
        dotColor: "#f87171",
      };

    default:
      return {
        bgcolor: "grey.100",
        color: "text.secondary",
        dotColor: "grey.400",
      };
  }
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { mutate: toggleStatus, isPending } = useToggleTaskStatus();
  const priorityStyles = getPrioritySx(task.priority);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        bgcolor: "background.paper",
        opacity: task.completed ? 0.7 : 1,
        transition: "box-shadow 0.2s ease, opacity 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        component="button"
        type="button"
        disabled={isPending}
        onClick={() => toggleStatus(task)}
        sx={{
          mt: 0.5,
          width: 18,
          height: 18,
          p: 0,
          borderRadius: "50%",
          border: "2px solid",
          borderColor: task.completed ? "success.main" : "divider",
          bgcolor: task.completed ? "success.main" : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          transition: "border-color 0.15s ease, background-color 0.15s ease",
          "&:hover": {
            borderColor: "success.main",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.4,
            color: task.completed ? "text.secondary" : "text.primary",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.25,
              borderRadius: 999,
              bgcolor: priorityStyles.bgcolor,
              color: priorityStyles.color,
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: priorityStyles.dotColor,
              }}
            />
            {priorityLabels[task.priority]}
          </Box>

          {task.completed && (
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              Done
            </Typography>
          )}
        </Stack>
      </Box>

      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: 12,
          color: "text.disabled",
          userSelect: "none",
        }}
      >
        #{task.id}
      </Typography>
    </Card>
  );
};
