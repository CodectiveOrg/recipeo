import { Fragment, type ReactNode, useCallback } from "react";

import { Link } from "react-router";

import type { InfiniteData } from "@tanstack/react-query";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import type { Recipe } from "@/entities/recipe";

import styles from "./recent-recipes.module.css";

type Props = {
  recentRecipes: InfiniteData<RecentRecipesResponseDto, unknown> | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  status: "error" | "success" | "pending";
};

export default function RecentRecipesSection({
  recentRecipes,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  status,
}: Props): ReactNode {
  const handleScroll = useCallback(
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

      <div className={styles["scroll-recipes"]} onScroll={handleScroll}>
        <ul>
          {recentRecipes?.pages.map((page, i) => (
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
