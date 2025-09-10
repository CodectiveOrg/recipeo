import { Fragment, type ReactNode } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getRecentRecipesApi } from "@/api/public/get-recentRecipes.api";

import ButtonComponent from "@/components/button/button.component";
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
    const nextCursor = end < all.length ? end : null;
    return { data, nextCursor };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["recent-recipes"],
      queryFn: fetchPage,
      getNextPageParam: (last) => last.nextCursor,
      initialPageParam: 0,
    });

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop - clientHeight < 250 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  if (status === "error") {
    return <>Error...</>;
  }

  return (
    <div className={styles["recent-recipes"]}>
      <div className={styles.header}>
        <TypographyComponent as="h2" variant="h2">
          Recent Recipes
        </TypographyComponent>
        <ButtonComponent variant="text" size="small" color="primary">
          View All
        </ButtonComponent>
      </div>

      <div className={styles["scroll-recipes"]} onScroll={onScroll}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((recipe: Recipe) => (
              <RecipeCardComponent key={recipe.id} recipe={recipe} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && <p>No more recipes</p>}
      </div>
    </div>
  );
}
