import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getRecipesApi } from "@/api/recipe/get-recipes.api.ts";

import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import SearchHistoryComponent from "@/components/search-history/search-history.componet.tsx";

import { recipeKeys } from "@/queries/keys.ts";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./search-page-placeholder.module.css";

export default function SearchPagePlaceholderComponent(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: recipeKeys.list({ type: "popular" }),
    queryFn: () => getRecipesApi({ pageParam: 1 }, "popular"),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: recipeKeys.list({ type: "chosen" }),
    queryFn: () => getRecipesApi({ pageParam: 1 }, "chosen"),
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
