import type { Task, Priority } from "../model/types";
import { useToggleTaskStatus } from "../api/task.queries";

interface TaskCardProps {
  task: Task;
}

const priorityConfig: Record<
  Priority,
  { label: string; badgeClass: string; dotClass: string }
> = {
  low: {
    label: "Low",
    badgeClass: "bg-emerald-100 text-emerald-700",
    dotClass: "bg-emerald-400",
  },
  medium: {
    label: "Medium",
    badgeClass: "bg-amber-100 text-amber-700",
    dotClass: "bg-amber-400",
  },
  high: {
    label: "High",
    badgeClass: "bg-red-100 text-red-700",
    dotClass: "bg-red-400",
  },
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { label, badgeClass, dotClass } = priorityConfig[task.priority];
  const { mutate: toggleStatus, isPending } = useToggleTaskStatus();

  return (
    <article
      className={[
        "flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        task.completed ? "border-gray-100 opacity-60" : "border-gray-200",
      ].join(" ")}
    >
      {/* Checkbox */}
      <button
        type="button"
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        disabled={isPending}
        onClick={() => toggleStatus(task)}
        className={[
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2",
          "transition-colors duration-150 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          task.completed
            ? "border-emerald-500 bg-emerald-500 hover:bg-emerald-400 hover:border-emerald-400"
            : "border-gray-300 bg-transparent hover:border-emerald-400",
        ].join(" ")}
      >
        {task.completed && (
          <svg
            viewBox="0 0 10 8"
            className="size-2.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4l2.5 2.5L9 1" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={[
            "text-sm font-medium leading-snug transition-colors duration-150",
            task.completed ? "text-gray-400 line-through" : "text-gray-900",
          ].join(" ")}
        >
          {task.title}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}`}
          >
            <span className={`size-1.5 rounded-full ${dotClass}`} />
            {label}
          </span>

          {task.completed && (
            <span className="text-xs text-gray-400">Done</span>
          )}
        </div>
      </div>

      {/* Task ID */}
      <span className="shrink-0 font-mono text-xs text-gray-300">
        #{task.id}
      </span>
    </article>
  );
};
