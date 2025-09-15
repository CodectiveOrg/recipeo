import { type ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component.tsx";

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
    return <LoadingComponent />;
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
