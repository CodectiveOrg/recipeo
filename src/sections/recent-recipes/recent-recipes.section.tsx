import { Fragment, type ReactNode, useCallback } from "react";

import { Link } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getRecentRecipesApi } from "@/api/public/get-recentRecipes.api";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { Recipe } from "@/entities/recipe";

import styles from "./recent-recipes.module.css";

const PAGE_SIZE = 2;

export default function RecentRecipesSection(): ReactNode {
  const fetchPage = async ({ pageParam = 0 }) => {
    const all = await getRecentRecipesApi();
    const start = pageParam;
    const end = start + PAGE_SIZE;
    const data = all.slice(start, end);
    const nextCursor =
      pageParam + PAGE_SIZE < all.length ? pageParam + PAGE_SIZE : null;

    return { data, nextCursor };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["recent-recipes"],
      queryFn: fetchPage,
      getNextPageParam: (last) => last.nextCursor,
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
              {page.data.map((recipe: Recipe) => (
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
