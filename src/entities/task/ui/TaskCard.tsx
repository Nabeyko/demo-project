import { Box, Typography, Card, Stack } from "@mui/material";
import type { Task, Priority } from "../model/types";
import { useToggleTaskStatus } from "../api/task.queries";

interface TaskCardProps {
  task: Task;
}

const priorityConfig: Record<
  Priority,
  { label: string; bg: string; text: string; dot: string }
> = {
  low: {
    label: "Low",
    bg: "#ecfdf5",
    text: "#047857",
    dot: "#34d399",
  },
  medium: {
    label: "Medium",
    bg: "#fffbeb",
    text: "#b45309",
    dot: "#fbbf24",
  },
  high: {
    label: "High",
    bg: "#fef2f2",
    text: "#b91c1c",
    dot: "#f87171",
  },
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { label, bg, text, dot } = priorityConfig[task.priority];
  const { mutate: toggleStatus, isPending } = useToggleTaskStatus();

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: task.completed ? "#f3f4f6" : "#e5e7eb",
        bgcolor: "white",
        transition: "all 0.2s ease",
        opacity: task.completed ? 0.6 : 1,
        "&:hover": {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        component="button"
        disabled={isPending}
        onClick={() => toggleStatus(task)}
        sx={{
          mt: 0.5,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "2px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.15s",
          bgcolor: task.completed ? "#10b981" : "transparent",
          borderColor: task.completed ? "#10b981" : "#d1d5db",
          "&:hover": {
            borderColor: "#10b981",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        }}
      >
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: task.completed ? "#9ca3af" : "#111827",
            textDecoration: task.completed ? "line-through" : "none",
            transition: "color 0.15s",
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
              borderRadius: "9999px",
              bgcolor: bg,
              color: text,
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: dot,
              }}
            />
            {label}
          </Box>

          {task.completed && (
            <Typography sx={{ fontSize: "12px", color: "#9ca3af" }}>
              Done
            </Typography>
          )}
        </Stack>
      </Box>

      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#d1d5db", // gray-300
          userSelect: "none",
        }}
      >
        #{task.id}
      </Typography>
    </Card>
  );
};
