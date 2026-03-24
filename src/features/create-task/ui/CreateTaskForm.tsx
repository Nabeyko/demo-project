import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import { createTaskSchema } from "@/entities/task";
import type { CreateTaskDto } from "@/entities/task";
import { useCreateTask } from "../model/use-create-task";

type PriorityOption = {
  value: CreateTaskDto["priority"];
  label: string;
};

const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const CreateTaskForm = () => {
  const { mutate: createTask, isPending } = useCreateTask();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      completed: false,
      priority: "medium",
    },
  });

  const onSubmit = (data: CreateTaskDto) => {
    createTask(data, { onSuccess: () => reset() });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2.5, fontWeight: 600 }}>
        New Task
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          {...register("title")}
          label="Title"
          placeholder="What needs to be done?"
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
          autoComplete="off"
          size="small"
        />

        <Box>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Priority</Typography>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                value={field.value}
                exclusive
                onChange={(_, newValue) => newValue && field.onChange(newValue)}
                sx={{
                  bgcolor: "#f3f4f6", 
                  p: "4px", 
                  borderRadius: "10px",
                  height: "40px",
                  border: "none",
                  "& .MuiToggleButton-root": {
                    border: "none",
                    borderRadius: "8px !important",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#6b7280",
                    "&.Mui-selected": {
                      bgcolor: "white",
                      color: "#2563eb",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)" 
                    }
                  }
                }}
              >
                {PRIORITY_OPTIONS.map(({ value, label }) => (
                  <ToggleButton key={value} value={value} sx={{ px: 2 }}>
                    {label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            disableElevation
          >
            {isPending ? "Adding..." : "Add Task"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
