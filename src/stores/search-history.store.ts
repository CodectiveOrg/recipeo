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
  add: (item) => {
    set((state) => ({ list: [...state.list, item] }));
  },
  remove: (id) =>
    set((state) => ({ list: state.list.filter((item) => item.id !== id) })),
  initialize: (items) => set({ list: items }),
  reset: () => set({ list: [] }),
}));
