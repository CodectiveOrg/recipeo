import { type ReactNode, useRef } from "react";

import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component.tsx";
import SearchInputComponent from "@/components/search/components/search-input/search-input.component.tsx";

import FilterButtonComponent from "@/pages/search/components/filter-button/filter-button.component.tsx";
import SearchFormComponent from "@/pages/search/components/search-form/search-form.component.tsx";

export default function SearchComponent(): ReactNode {
  const filterDrawerRef = useRef<HTMLDialogElement | null>(null);

  return (
    <SearchFormComponent formDrawerRef={filterDrawerRef}>
      <SearchInputComponent />
      <FilterButtonComponent formDrawerRef={filterDrawerRef} />
      <FiltersDrawerComponent ref={filterDrawerRef} />
    </SearchFormComponent>
  );
}
