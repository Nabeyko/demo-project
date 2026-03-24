import type { ReactNode } from "react";
import { WithJotai } from "./with-jotai";
import { WithQuery } from "./with-query";
import { WithTheme } from "./with-theme";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <WithJotai>
    <WithQuery>
      <WithTheme>
        {children}
      </WithTheme>
    </WithQuery>
  </WithJotai>
);
