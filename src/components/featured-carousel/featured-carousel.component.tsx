import type { ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import FeaturedRecipeCardComponent, {
  FeaturedRecipeCardSkeleton,
} from "@/components/featured-recipe-card/featured-recipe-card.component.tsx";

import type { GetFeaturedRecipesResponseDto } from "@/dto/response/get-featured-recipes.response.dto.ts";

import styles from "./featured-carousel.module.css";

type Props = {
  queryResult: UseQueryResult<GetFeaturedRecipesResponseDto>;
};

export default function FeaturedRecipesCarouselComponent({
  queryResult,
}: Props): ReactNode {
  const { data, isPending, isError } = queryResult;

  if (isPending) {
    return <FeaturedRecipesCarouselSkeleton />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <CarouselComponent spaceBetween={16}>
      {data.map((featured) => (
        <div key={featured.id} className={styles.slide}>
          <FeaturedRecipeCardComponent featured={featured} />
        </div>
      ))}
    </CarouselComponent>
  );
}

export function FeaturedRecipesCarouselSkeleton(): ReactNode {
  return (
    <CarouselComponent spaceBetween={16}>
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={styles.slide}>
            <FeaturedRecipeCardSkeleton />
          </div>
        ))}
    </CarouselComponent>
  );
}
