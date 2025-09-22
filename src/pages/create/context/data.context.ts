import { createContext } from "react";

import type { Tag } from "@/entities/tag.ts";

type ContextValue = {
  allTags: Tag[];
};

export const DataContext = createContext<ContextValue>({} as ContextValue);
