import { AppProviders } from "@/app/providers";
import { CreateTaskForm } from "@/features/create-task";
import { TaskFilters } from "@/features/filter-tasks";
import { TaskList } from "@/widgets/task-list";

export const App = () => {
  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-xl font-bold text-gray-900">
              Task Management Dashboard
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Powered by JSONPlaceholder
            </p>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Create form */}
            <CreateTaskForm />

            {/* Task list section */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Tasks
                </h2>
                <TaskFilters />
              </div>

              <TaskList />
            </section>
          </div>
        </main>
      </div>
    </AppProviders>
  );
};
