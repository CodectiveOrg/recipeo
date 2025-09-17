import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useSearchHistoryStore } from "@/stores/search-history.store";

import { searchRecipesApi } from "@/api/recipe/search-recipes.api";

import BackButtonComponent from "@/components/back-button/back-button.component";
import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import SearchInputComponent from "@/components/search-input/search-input.component";

import FilterButtonComponent from "./components/filter-button/filter-button.component";

import styles from "./search.module.css";

export default function SearchPage(): ReactNode {
  const queryRef = useRef<HTMLInputElement | null>(null);

  const filterDrawerRef = useRef<HTMLDialogElement | null>(null);

  const [shouldCallApi, setShouldCallApi] = useState<boolean>(false);

  const add = useSearchHistoryStore((state) => state.add);

  const handleSearchInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Enter") {
      add({ query: queryRef.current?.value });
      setShouldCallApi(true);
    }
  };

  const { data } = useQuery({
    queryKey: ["recipes", queryRef.current?.value],
    queryFn: () => searchRecipesApi({ query: queryRef.current?.value }),
    enabled: shouldCallApi,
  });

  console.log(data);

  return (
    <div className={styles.search}>
      <header>
        <BackButtonComponent />
        <SearchInputComponent
          ref={queryRef}
          onKeyDown={handleSearchInputKeyDown}
        />
        <FilterButtonComponent ref={filterDrawerRef}></FilterButtonComponent>
      </header>
      <main>
        <FiltersDrawerComponent ref={filterDrawerRef}></FiltersDrawerComponent>
        <SearchHistoryComponent />
      </main>
    </div>
  );
}
