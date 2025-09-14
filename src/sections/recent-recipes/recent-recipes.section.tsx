import { Fragment, type ReactNode, type UIEvent } from "react";

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import type { Recipe } from "@/entities/recipe.ts";

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

  const handleScroll = (e: UIEvent<HTMLDivElement>): void => {
    console.log("here");

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (
      scrollHeight - scrollTop - clientHeight < 250 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["recent-recipes"]} onScroll={handleScroll}>
      <ul>
        {data.pages.map((page) => (
          <Fragment key={page.currentPage}>
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
  );
}
