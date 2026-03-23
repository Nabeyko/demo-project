import { Provider } from "jotai";
import type { ReactNode } from "react";

interface WithJotaiProps {
  children: ReactNode;
}

export const WithJotai = ({ children }: WithJotaiProps) => (
  <Provider>{children}</Provider>
);
