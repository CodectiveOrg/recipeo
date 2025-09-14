import { type ReactNode } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import HandfulSection from "@/sections/handful/handful.section.tsx";
import RecentRecipesSection from "@/sections/recent-recipes/recent-recipes.section.tsx";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api.ts";
import { getRecentRecipesApi } from "@/api/public/get-recentRecipes.api.ts";

import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto.ts";

import styles from "./home.module.css";

const PAGE_SIZE = 5;

type FetchPageType = {
  pageParam: number;
};

export default function HomePage(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular"],
    queryFn: getPopularRecipesApi,
  });

  const fetchPage = async ({
    pageParam = 0,
  }: FetchPageType): Promise<RecentRecipesResponseDto> => {
    const all = await getRecentRecipesApi();
    const start = pageParam;
    const end = start + PAGE_SIZE;
    const pageItems = all.items.slice(start, end);
    const currentPage = Math.floor(start / PAGE_SIZE) + 1;
    const lastPage = Math.ceil(all.items.length / PAGE_SIZE);
    return { items: pageItems, lastPage, currentPage };
  };

  const {
    data: recentRecipes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["recent-recipes"],
    queryFn: ({ pageParam = 0 }) => fetchPage({ pageParam }),
    getNextPageParam: (last) => {
      if (last.currentPage < last.lastPage) {
        return last.currentPage * PAGE_SIZE;
      }
      return undefined;
    },

    initialPageParam: 0,
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
        <RecentRecipesSection
          recentRecipes={recentRecipes}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          status={status}
        />
      </main>
    </div>
  );
}
