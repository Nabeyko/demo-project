import { useAtom } from "jotai";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
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
    <Box
      sx={{
        display: "inline-flex",
        p: "4px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "10px",
        height: "40px",
        bgcolor: "grey.100",
      }}
    >
      <ToggleButtonGroup
        value={filter}
        exclusive
        aria-label="Filter tasks"
        size="small"
        sx={{
          gap: 0.5,
          "& .MuiToggleButton-root": {
            border: 0,
            borderRadius: "8px",
            px: 2,
            textTransform: "none",
            fontWeight: 600,
            color: "text.secondary",
            "&.Mui-selected": {
              bgcolor: "background.paper",
              color: "primary.main",
              boxShadow: 1,
            },
          },
        }}
      >
        {FILTER_OPTIONS.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            disableRipple
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
