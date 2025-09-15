import type { ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import clsx from "clsx";

import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component.tsx";

import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import styles from "./recipes-carousel.module.css";

type Props = {
  queryResult: UseQueryResult<PaginatedRecipesResponseDto>;
  size?: "medium" | "small";
};

export default function RecipesCarouselComponent({
  queryResult,
  size = "medium",
}: Props): ReactNode {
  const { data, isPending, isError } = queryResult;

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <CarouselComponent>
      {data.items.map((recipe) => (
        <div key={recipe.id} className={clsx(styles.slide, styles[size])}>
          <RecipeCardComponent recipe={recipe} />
        </div>
      ))}
    </CarouselComponent>
  );
}
