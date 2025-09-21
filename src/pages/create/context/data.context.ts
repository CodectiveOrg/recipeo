import { createContext } from "react";

import type { Tag } from "@/entities/tag.ts";

export type ContextValue = {
  allTags: Tag[];
};

export const DataContext = createContext<ContextValue>({} as ContextValue);
