import { create } from "zustand/react";

import type { SearchHistoryType } from "@/types/search-history.type.ts";

type SearchHistoryStore = {
  list: SearchHistoryType[];
  add: (item: SearchHistoryType) => void;
  remove: (id: number) => void;
  initialize: (items: SearchHistoryType[]) => void;
  reset: () => void;
};

export const useSearchHistory = create<SearchHistoryStore>((set) => ({
  list: [{ id: 1, title: "TEST" }],
  add: (item): void => {
    set((state) => ({ list: [...state.list, item] }));
  },
  remove: (id): void =>
    set((state) => ({ list: state.list.filter((item) => item.id !== id) })),
  initialize: (items): void => set({ list: items }),
  reset: (): void => set({ list: [] }),
}));
