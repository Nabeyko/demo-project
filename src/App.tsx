import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import { AppProviders } from "@/app/providers";
import { CreateTaskForm } from "@/features/create-task";
import { TaskFilters } from "@/features/filter-tasks";
import { TaskList } from "@/widgets/task-list";

export const App = () => {
  return (
    <AppProviders>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters sx={{ py: 2, display: "block" }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                Task Management Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Powered by JSONPlaceholder
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 6 }}>
          <Stack spacing={4}>
            <CreateTaskForm />

            <Box component="section">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tasks
                </Typography>
                <TaskFilters />
              </Stack>

              <TaskList />
            </Box>
          </Stack>
        </Container>
      </Box>
    </AppProviders>
  );
};
