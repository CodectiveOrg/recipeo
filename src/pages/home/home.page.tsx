import { type ReactNode } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api.ts";
import { getRecentRecipesApi } from "@/api/public/get-recent-recipes.api.ts";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular"],
    queryFn: getPopularRecipesApi,
  });

  const recentRecipesQueryResult = useInfiniteQuery({
    queryKey: ["recipes", "recent"],
    queryFn: getRecentRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <HandfulSection title="Tags" viewAllHref="/tags">
          <TagsCarouselComponent />
        </HandfulSection>
        <br />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <br />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent
            queryResult={popularRecipesQueryResult}
            size="small"
          />
        </HandfulSection>
        <br />
        <HandfulSection title="Recent Recipes" viewAllHref="/recent">
          <InfiniteRecipesComponent queryResult={recentRecipesQueryResult} />
        </HandfulSection>
      </main>
    </div>
  );
}
