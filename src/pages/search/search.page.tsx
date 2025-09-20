import { type ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component";
import SearchComponent from "@/components/search/search.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import SearchPagePlaceholderComponent from "@/pages/search/components/search-page-placeholder/search-page-placeholder.component.tsx";
import SearchResultsComponent from "@/pages/search/components/search-results/search-results.component.tsx";

import { formatSearchTitle } from "@/utils/format.utils.ts";
import { generateSearchUrl } from "@/utils/url.utils.ts";

import styles from "./search.module.css";

export default function SearchPage(): ReactNode {
  const [params] = useFilterParams();
  const queryString = generateSearchUrl(params);

  const title = formatSearchTitle(params);

  return (
    <div className={styles.search}>
      <TitleComponent>{title ? `${title} | Search` : "Search"}</TitleComponent>
      <header>
        <BackButtonComponent />
        <SearchComponent />
      </header>
      <main>
        {queryString ? (
          <SearchResultsComponent queryString={queryString} />
        ) : (
          <SearchPagePlaceholderComponent />
        )}
      </main>
    </div>
  );
}
