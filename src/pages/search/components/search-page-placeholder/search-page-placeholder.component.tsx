import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api.ts";

import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import SearchHistoryComponent from "@/components/search-history/search-history.componet.tsx";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./search-page-placeholder.module.css";

export default function SearchPagePlaceholderComponent(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular", 1],
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen", 1],
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
  });

  return (
    <div className={styles["search-page-placeholder"]}>
      <SearchHistoryComponent />
      <HandfulSection title="Popular Recipes" viewAllHref="/popular">
        <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
      </HandfulSection>
      <HandfulSection title="Editor's Choice" viewAllHref="/chosen">
        <ChosenRecipesComponent queryResult={chosenRecipesQueryResult} />
      </HandfulSection>
    </div>
  );
}
