import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

const MAX_LENGTH = 5;

type SearchHistoryState = {
  searchHistoryItems: SearchRequestDto[];
  addSearchHistoryItem: (item: SearchRequestDto) => void;
  removeSearchHistoryItem: (index: number) => void;
  clearSearchHistory: () => void;
};

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      searchHistoryItems: [],
      addSearchHistoryItem: (item) => {
        set((state) => ({
          searchHistoryItems: [item, ...state.searchHistoryItems].slice(
            0,
            MAX_LENGTH,
          ),
        }));
      },
      removeSearchHistoryItem: (index) =>
        set((state) => ({
          searchHistoryItems: state.searchHistoryItems.toSpliced(index, 1),
        })),
      clearSearchHistory: () => set({ searchHistoryItems: [] }),
    }),
    { name: "searchHistory" },
  ),
);
