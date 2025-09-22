import type { ReactNode } from "react";

import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import SearchHistoryComponent from "@/components/search-history/search-history.componet.tsx";

import { useInfiniteRecipesQuery } from "@/queries/use-infinite-recipes.query.ts";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./search-page-placeholder.module.css";

export default function SearchPagePlaceholderComponent(): ReactNode {
  const popularRecipesQueryResult = useInfiniteRecipesQuery("popular");
  const chosenRecipesQueryResult = useInfiniteRecipesQuery("chosen");

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
