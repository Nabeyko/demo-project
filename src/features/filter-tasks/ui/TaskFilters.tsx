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

const toggleGroupStyles = {
  borderRadius: "8px !important",
  border: "none !important",
  px: 2,
  py: 0.75,
  textTransform: "none",
  fontWeight: 600,
  transition: "all 0.2s ease",

  "&.Mui-selected": {
    bgcolor: "white",
    color: "primary.main",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    "&:hover": { bgcolor: "white" },
  },

  "&:not(.Mui-selected)": {
    color: "text.secondary",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.6)",
      color: "text.primary",
    },
  },
};

export const TaskFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <Box
      sx={{
        p: 0.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <ToggleButtonGroup
        value={filter}
        exclusive
        aria-label="Filter tasks"
        size="small"
        sx={{ gap: 1 }}
      >
        {FILTER_OPTIONS.map(({ value, label }) => (
          <ToggleButton
            key={value}
            value={value}
            onClick={() => setFilter(value)}
            disableRipple
            sx={toggleGroupStyles}
          >
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
