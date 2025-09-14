import { create } from "zustand/react";

import type { SearchHistoryType } from "@/types/search-history.type.ts";

type SearchHistoryStore = {
  list: SearchHistoryType[];
  add: (item: SearchHistoryType) => void;
  remove: (id: number) => void;
  reset: () => void;
};

const save = (lists: SearchHistoryType[]): void => {
  localStorage.setItem("search-history", JSON.stringify(lists));
};

const load = (): SearchHistoryType[] => {
  const item = localStorage.getItem("search-history");
  if (!item) {
    return [];
  }

  return JSON.parse(item);
};

export const useSearchHistory = create<SearchHistoryStore>((set) => ({
  list: [],
  add: (item) => {
    set((state) => ({ list: [...state.list, item] }));
  },
  remove: (id) =>
    set((state) => ({ list: state.list.filter((item) => item.id !== id) })),
  reset: () => set({ list: [] }),
}));
