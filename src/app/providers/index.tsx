import type { ReactNode } from "react";
import { WithJotai } from "./with-jotai";
import { WithQuery } from "./with-query";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <WithJotai>
    <WithQuery>{children}</WithQuery>
  </WithJotai>
);
