import type { ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getPopularRecipesApi } from "@/api/public/get-popularRecipes.api";

import CarouselComponent from "@/components/carousel/carousel.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./popular-recipes.module.css";

type Props = {
  size?: "medium" | "small";
};

export default function PopularRecipesSection({
  size = "medium",
}: Props): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: ["popular-recipes"],
    queryFn: getPopularRecipesApi,
  });

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }
  return (
    <div className={styles["popular-recipes"]}>
      <div className={styles["header"]}>
        <TypographyComponent as="h1" variant="h1">
          Popular Recipes
        </TypographyComponent>
        <Link to="#">View All</Link>
      </div>
      <>
        <CarouselComponent
          slideBlockSize={size === "medium" ? "15rem" : "8.5rem"}
          slideInlineSize={size === "medium" ? "12.5rem" : "6.25rem"}
        >
          {data.map((recipe) => (
            <RecipeCardComponent key={recipe.id} recipe={recipe} />
          ))}
        </CarouselComponent>
      </>
    </div>
  );
}
