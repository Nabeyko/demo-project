import { atom } from "jotai";

export type FilterValue = "all" | "active" | "completed";

export const filterAtom = atom<FilterValue>("all");
