import { Fragment, type ReactNode } from "react";

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import styles from "./recent-recipes.module.css";

type Props = {
  queryResult: UseInfiniteQueryResult<InfiniteData<RecentRecipesResponseDto>>;
};

export default function RecentRecipesSection({
  queryResult,
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
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["recent-recipes"]}>
      <ul>
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
      </ul>
      {isFetchingNextPage && (
        <TypographyComponent as="p" variant="s" color="text-secondary">
          Loading...
        </TypographyComponent>
      )}
      {!hasNextPage && (
        <TypographyComponent as="p" variant="s" color="text-secondary">
          All done!
        </TypographyComponent>
      )}
    </div>
  );
}
