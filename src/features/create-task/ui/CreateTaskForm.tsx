import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/shared/ui";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-base font-semibold text-gray-900">
        New Task
      </h2>

      <div className="flex flex-col gap-4">
        <Input
          {...register("title")}
          label="Title"
          placeholder="What needs to be done?"
          error={errors.title?.message}
          autoComplete="off"
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700">Priority</span>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2">
                {PRIORITY_OPTIONS.map(({ value, label }) => (
                  <Button
                    key={value}
                    type="button"
                    size="sm"
                    variant={field.value === value ? "primary" : "secondary"}
                    onClick={() => field.onChange(value)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            )}
          />
        </div>

        <div className="flex justify-end pt-1">
          <Button type="submit" isLoading={isPending}>
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
};
