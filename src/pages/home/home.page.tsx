import { type ReactNode, useRef } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useSearchHistoryStore } from "@/stores/search-history.store.ts";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api.ts";
import { getRecentRecipesApi } from "@/api/recipe/get-recent-recipes.api.ts";

import ButtonComponent from "@/components/button/button.component";
import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const add = useSearchHistoryStore((state) => state.add);

  const drawerRef = useRef<HTMLDialogElement | null>(null);

  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular", 1],
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen", 1],
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
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
        <FiltersDrawerComponent ref={drawerRef} />
        <ButtonComponent onClick={() => drawerRef.current?.showModal()}>
          Show Drawer
        </ButtonComponent>
        <ButtonComponent onClick={() => add({ query: "value" })}>
          Add Search History
        </ButtonComponent>
        <SearchHistoryComponent />
        <HandfulSection title="Tags" viewAllHref="/tags">
          <TagsCarouselComponent />
        </HandfulSection>
        <br />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <br />
        <HandfulSection title="Editor's Choice" viewAllHref="/chosen">
          <ChosenRecipesComponent queryResult={chosenRecipesQueryResult} />
        </HandfulSection>
        <br />
        <HandfulSection title="Recent Recipes" viewAllHref="/recent">
          <InfiniteRecipesComponent queryResult={recentRecipesQueryResult} />
        </HandfulSection>
      </main>
    </div>
  );
}
