import type { ReactNode } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import clsx from "clsx";

import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import FeaturedRecipeCardComponent from "@/components/featured-recipe-card/featured-recipe-card.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";

import type { PaginatedFeaturedRecipesResponseDto } from "@/dto/response/paginated-featured-recipes.response.dto.ts";

import styles from "./featured-carousel.module.css";

type Props = {
  queryResult: UseQueryResult<PaginatedFeaturedRecipesResponseDto>;
  size?: "medium" | "small";
};

export default function FeaturedRecipesCarouselComponent({
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
      {data.items.map((featured) => {
        console.log(featured);

        return (
          <div key={featured.id} className={clsx(styles.slide, styles[size])}>
            <FeaturedRecipeCardComponent featured={featured} />
          </div>
        );
      })}
    </CarouselComponent>
  );
}
