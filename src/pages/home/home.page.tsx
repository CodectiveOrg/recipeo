import { type ReactNode, useRef } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api.ts";
import { getRecentRecipesApi } from "@/api/public/get-recent-recipes.api.ts";
import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";

import ButtonComponent from "@/components/button/button.component";
import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component.tsx";
import DrawerComponent from "@/components/drawer/drawer.component";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const drawerRef = useRef<HTMLDialogElement | null>(null);

  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular"],
    queryFn: getPopularRecipesApi,
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen"],
    queryFn: getChosenRecipesApi,
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
      <DrawerComponent ref={drawerRef}>
        <TypographyComponent variant="h2">Drawer Component</TypographyComponent>
      </DrawerComponent>
      <header>Header</header>
      <main>
        <ButtonComponent onClick={() => drawerRef.current?.showModal()}>
          Show Drawer
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
