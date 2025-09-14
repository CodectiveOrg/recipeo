import type { ReactNode } from "react";

import { Link } from "react-router";

import { type UseQueryResult } from "@tanstack/react-query";

import clsx from "clsx";

import CarouselComponent from "@/components/carousel/carousel.component";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import styles from "./recipes-carousel.module.css";

type Props = {
  title: string;
  queryResult: UseQueryResult<PaginatedRecipesResponseDto>;
  viewAllHref?: string;
  size?: "medium" | "small";
};

export default function RecipesCarouselSection({
  title,
  queryResult,
  viewAllHref,
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
    <div className={styles["recipes-carousel"]}>
      <div className={styles.header}>
        <TypographyComponent as="h2" variant="h1">
          {title}
        </TypographyComponent>
        {viewAllHref && <Link to={viewAllHref}>View All</Link>}
      </div>
      <CarouselComponent>
        {data.items.map((recipe) => (
          <div key={recipe.id} className={clsx(styles.slide, styles[size])}>
            <RecipeCardComponent recipe={recipe} />
          </div>
        ))}
      </CarouselComponent>
    </div>
  );
}
