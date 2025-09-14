import type { ReactNode } from "react";

import { Link } from "react-router";

import { type UseQueryResult } from "@tanstack/react-query";

import clsx from "clsx";

import CarouselComponent from "@/components/carousel/carousel.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { PaginatedResponseDto } from "@/dto/response/pagination.response.dto.ts";

import type { Recipe } from "@/entities/recipe.ts";

import styles from "./recipes-carousel.module.css";

type Props = {
  title: string;
  viewAllHref?: string;
  queryResult: UseQueryResult<PaginatedResponseDto<Recipe>>;
  size?: "medium" | "small";
};

export default function RecipesCarouselSection({
  title,
  viewAllHref,
  queryResult,
  size = "medium",
}: Props): ReactNode {
  const { data, isPending, isError } = queryResult;

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["recipes-carousel"]}>
      <div className={styles["header"]}>
        <TypographyComponent as="h1" variant="h1">
          {title}
        </TypographyComponent>
        {viewAllHref && <Link to={viewAllHref}>View All</Link>}
      </div>
      <CarouselComponent>
        {data.items.map((recipe) => (
          <div className={clsx(styles.slide, styles[size])}>
            <RecipeCardComponent key={recipe.id} recipe={recipe} />
          </div>
        ))}
      </CarouselComponent>
    </div>
  );
}
