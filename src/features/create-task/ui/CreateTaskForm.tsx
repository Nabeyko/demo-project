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
  } = useForm({
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
                  bgcolor: "grey.100",
                  p: "4px",
                  borderRadius: "10px",
                  height: "40px",
                  border: "none",
                  "& .MuiToggleButton-root": {
                    border: 0,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "text.secondary",
                    px: 2,
                    "&.Mui-selected": {
                      bgcolor: "background.paper",
                      color: "primary.main",
                      boxShadow: 1,
                    },
                  },
                }}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    {option.label}
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
