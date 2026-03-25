import { Box, Paper, Skeleton, Stack } from "@mui/material";

interface TaskSkeletonProps {
  count?: number;
}

const SkeletonCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Skeleton variant="circular" width={16} height={16} sx={{ mt: 0.5 }} />

      <Box sx={{ flex: 1 }}>
        <Stack spacing={1}>
          <Skeleton variant="text" width="75%" height={24} />
          <Skeleton variant="text" width="25%" height={18} />
        </Stack>
      </Box>

      <Skeleton variant="text" width={24} height={18} />
    </Paper>
  );
};

export const TaskSkeleton = ({ count = 5 }: TaskSkeletonProps) => {
  return (
    <Stack spacing={1.5} aria-label="Loading tasks">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </Stack>
  );
};
