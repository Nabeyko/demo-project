import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

interface WithQueryProps {
  children: ReactNode;
}

export const WithQuery = ({ children }: WithQueryProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
