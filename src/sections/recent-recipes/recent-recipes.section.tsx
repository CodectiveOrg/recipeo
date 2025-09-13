import { Fragment, type ReactNode, useCallback } from "react";

import { Link } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getRecentRecipesApi } from "@/api/public/get-recentRecipes.api";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import type { Recipe } from "@/entities/recipe";

import styles from "./recent-recipes.module.css";

const PAGE_SIZE = 5;

type FetchPageType = {
  pageParam: number;
};

export default function RecentRecipesSection(): ReactNode {
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
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

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop - clientHeight < 250 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  if (status === "error") {
    return <>Error...</>;
  }

  return (
    <div className={styles["recent-recipes"]}>
      <div className={styles.header}>
        <TypographyComponent as="h2" variant="h2">
          Recent Recipes
        </TypographyComponent>
        <Link to="#">View All</Link>
      </div>

      <div className={styles["scroll-recipes"]} onScroll={onScroll}>
        <ul>
          {data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.items.map((recipe: Recipe) => (
                <li key={recipe.id}>
                  <RecipeCardComponent recipe={recipe} />
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
        {isFetchingNextPage && (
          <TypographyComponent as="p" variant="s" color="text-secondary">
            Loading more...
          </TypographyComponent>
        )}
        {!hasNextPage && (
          <TypographyComponent as="p" variant="s" color="text-secondary">
            No more recipes
          </TypographyComponent>
        )}
      </div>
    </div>
  );
}
