import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

const MAX_LENGTH = 3;

type SearchHistoryState = {
  items: SearchRequestDto[];
  add: (item: SearchRequestDto) => void;
  remove: (index: number) => void;
  clear: () => void;
};

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => {
        set((state) => ({
          items: [item, ...state.items].slice(0, MAX_LENGTH),
        }));
      },
      remove: (index) =>
        set((state) => ({ items: state.items.toSpliced(index, 1) })),
      clear: () => set({ items: [] }),
    }),
    { name: "searchHistory" },
  ),
);
