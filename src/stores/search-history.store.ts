import { create } from "zustand/react";

import type { SearchHistoryType } from "@/types/search-history.type";

type SearchHistoryStore = {
  list: SearchHistoryType[];
  addToList: (item: SearchHistoryType) => void;
  remove: (id: number) => void;
};

const save = (lists: SearchHistoryType[]):void => {
   localStorage.setItem("search-history", JSON.stringify(lists))
}

const load = (): SearchHistoryType[] => {
  const item = localStorage.getItem("search-history");
  if(! item) {
    return []
  }

  return JSON.parse(item);
}

export const useSearchHistory = create<SearchHistoryStore>((set) => ({
  list: load(),
  addToList: (item) =>set(state => ({ state.list: [...state.list, item]})),
  remove: (id) => set(state => ({})),
}));
