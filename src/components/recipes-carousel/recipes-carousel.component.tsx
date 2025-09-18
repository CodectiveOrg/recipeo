import type { ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import clsx from "clsx";

import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import RecipeCardComponent, {
  RecipeCardSkeleton,
} from "@/components/recipe-card/recipe-card.component.tsx";

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
    return <RecipesCarouselSkeleton size={size} />;
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

export function RecipesCarouselSkeleton({ size }: Partial<Props>): ReactNode {
  return (
    <CarouselComponent>
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={clsx(styles.slide, styles[size!])}>
            <RecipeCardSkeleton />
          </div>
        ))}
    </CarouselComponent>
  );
}
