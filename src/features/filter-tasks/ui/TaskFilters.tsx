import { useAtom } from "jotai";
import { filterAtom } from "../model";
import type { FilterValue } from "../model";

type FilterOption = {
  value: FilterValue;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export const TaskFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <div
      role="group"
      aria-label="Filter tasks"
      className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1"
    >
      {FILTER_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setFilter(value)}
          className={[
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
            filter === value
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/60",
          ].join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
