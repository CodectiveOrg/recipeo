import { type ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import RecipeCardComponent, {
  RecipeCardSkeleton,
} from "@/components/recipe-card/recipe-card.component.tsx";

import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import styles from "./chosen-recipes.module.css";

type Props = {
  queryResult: UseQueryResult<PaginatedRecipesResponseDto>;
};

export default function ChosenRecipesComponent({
  queryResult,
}: Props): ReactNode {
  const { data, isPending, isError } = queryResult;

  if (isPending) {
    return <ChosenRecipesSkeleton />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <ul className={styles["chosen-recipes"]}>
      {data.items.slice(0, 5).map((recipe) => (
        <li key={recipe.id}>
          <RecipeCardComponent recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

export function ChosenRecipesSkeleton(): ReactNode {
  return (
    <ul className={styles["chosen-recipes"]}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <li key={i}>
            <RecipeCardSkeleton />
          </li>
        ))}
    </ul>
  );
}
