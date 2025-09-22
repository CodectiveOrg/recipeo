import { type ReactNode } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";
import { getFeaturedRecipesApi } from "@/api/recipe/get-featured-recipes.api.ts";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api.ts";
import { getRecentRecipesApi } from "@/api/recipe/get-recent-recipes.api.ts";

import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import FeaturedRecipesCarouselComponent from "@/components/featured-carousel/featured-carousel.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

import GreetingsSection from "@/sections/greetings/greetings.section.tsx";
import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const featuredRecipesQueryResult = useQuery({
    queryKey: recipeKeys.list({ type: "featured" }),
    queryFn: getFeaturedRecipesApi,
  });

  const popularRecipesQueryResult = useQuery({
    queryKey: recipeKeys.list({ type: "popular" }),
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: recipeKeys.list({ type: "chosen" }),
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
  });

  const recentRecipesQueryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "recent" }),
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
      <TitleComponent>Home</TitleComponent>
      <header>
        <GreetingsSection />
      </header>
      <main>
        <HandfulSection title="Featured">
          <FeaturedRecipesCarouselComponent
            queryResult={featuredRecipesQueryResult}
          />
        </HandfulSection>
        <HandfulSection title="Tags" viewAllHref="/tags">
          <TagsCarouselComponent />
        </HandfulSection>
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <HandfulSection title="Editor's Choice" viewAllHref="/chosen">
          <ChosenRecipesComponent queryResult={chosenRecipesQueryResult} />
        </HandfulSection>
        <HandfulSection title="Recent Recipes" viewAllHref="/recent">
          <InfiniteRecipesComponent queryResult={recentRecipesQueryResult} />
        </HandfulSection>
      </main>
    </div>
  );
}
