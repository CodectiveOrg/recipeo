import { type CSSProperties, Fragment, type ReactNode } from "react";

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";

import RecipeCardComponent, {
  RecipeCardSkeleton,
} from "@/components/recipe-card/recipe-card.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import styles from "./infinite-recipes.module.css";

type Props = {
  queryResult: UseInfiniteQueryResult<
    InfiniteData<PaginatedRecipesResponseDto>
  >;
  columnsCount?: number;
};

export default function InfiniteRecipesComponent({
  queryResult,
  columnsCount = 1,
}: Props): ReactNode {
  const {
    isPending,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = queryResult;

  const { ref } = useInView({
    onChange: async (inView) => {
      if (inView && !isFetchingNextPage && hasNextPage) {
        await fetchNextPage();
      }
    },
  });

  if (isPending) {
    return <InfiniteRecipesSkeleton columnsCount={columnsCount} />;
  }

  if (isError) {
    return <>Error...</>;
  }

  const isEmpty = data.pages[0].items.length === 0;

  return (
    <div className={styles["infinite-recipes"]}>
      <ul style={{ "--columns-count": `${columnsCount}` } as CSSProperties}>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={page.currentPage}>
            {page.items.map((recipe, recipeIndex) => (
              <li
                key={recipe.id}
                ref={
                  hasNextPage &&
                  pageIndex === data.pages.length - 1 &&
                  recipeIndex === page.items.length - 1
                    ? ref
                    : undefined
                }
              >
                <RecipeCardComponent recipe={recipe} />
              </li>
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage &&
          Array(columnsCount)
            .fill(null)
            .map((_, i) => (
              <li key={i}>
                <RecipeCardSkeleton />
              </li>
            ))}
      </ul>
      {isEmpty && (
        <TypographyComponent as="p" variant="s" color="text-secondary">
          No recipes found!
        </TypographyComponent>
      )}
      {!hasNextPage && !isEmpty && (
        <TypographyComponent as="p" variant="s" color="text-secondary">
          All done!
        </TypographyComponent>
      )}
    </div>
  );
}

export function InfiniteRecipesSkeleton({
  columnsCount,
}: Partial<Props>): ReactNode {
  return (
    <div className={styles["infinite-recipes"]}>
      <ul style={{ "--columns-count": `${columnsCount}` } as CSSProperties}>
        <li>
          <RecipeCardSkeleton />
        </li>
      </ul>
    </div>
  );
}
