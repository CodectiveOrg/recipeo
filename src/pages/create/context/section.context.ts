import { type Context, createContext } from "react";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";

type ContextValue = {
  context: Context<BaseContextValue<BaseItem>>;
};

export const SectionContext = createContext<ContextValue>({} as ContextValue);
