import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api";

import BackButtonComponent from "@/components/back-button/back-button.component";
import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import SearchComponent from "@/components/search/search.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import SearchResultComponent from "@/pages/search/components/search-result/search-result.component.tsx";

import HandfulSection from "@/sections/handful/handful.section";

import styles from "./search.module.css";

export default function SearchPage(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular", 1],
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen", 1],
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
  });

  return (
    <div className={styles.search}>
      <header>
        <BackButtonComponent />
        <SearchComponent />
      </header>
      <main>
        <SearchHistoryComponent />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <HandfulSection title="Editor's Choice" viewAllHref="/chosen">
          <ChosenRecipesComponent queryResult={chosenRecipesQueryResult} />
        </HandfulSection>
        <TypographyComponent as="h2" variant="h2">
          Search Result
        </TypographyComponent>
        <SearchResultComponent />
      </main>
    </div>
  );
}
