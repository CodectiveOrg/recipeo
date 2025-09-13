import { type ReactNode } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import RecentRecipesSection from "@/sections/recent-recipes/recent-recipes.section";

import { getRecentRecipesApi } from "@/api/public/get-recentRecipes.api";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import { richFetch } from "@/utils/fetch.utils.ts";

import styles from "./home.module.css";

const PAGE_SIZE = 5;

type FetchPageType = {
  pageParam: number;
};

export default function HomePage(): ReactNode {
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const data = await richFetch<RecentRecipesResponseDto>("/recipe/recent");

      if ("error" in data) {
        throw new Error(data.error);
      }
      return data.result.items;
    },
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
        <br />
        <RecentRecipesSection
          recentRecipes={recentRecipes}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          status={status}
        />
        <br />
        <br />
        <br />
        {data && (
          <>
            <RecipeCardComponent recipe={data[0]} />
            <RecipeCardComponent recipe={data[1]} />
            <RecipeCardComponent recipe={data[2]} />
          </>
        )}
      </main>
    </div>
  );
}
