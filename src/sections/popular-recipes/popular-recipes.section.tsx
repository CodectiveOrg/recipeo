import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getPopularRecipesApi } from "@/api/public/get-popularRecipes.api";

import ButtonComponent from "@/components/button/button.component";
import CarouselComponent from "@/components/carousel/carousel.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./popular-recipes.module.css";

type Props = {
  size?: "large" | "small";
};

export default function PopularRecipesSection({
  size = "large",
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
        <TypographyComponent variant="h1">Popular Recipes</TypographyComponent>
        <ButtonComponent variant="text" size="small" color="primary">
          View All
        </ButtonComponent>
      </div>

      <CarouselComponent
        slideBlockSize={size === "large" ? "15rem" : "8.5rem"}
        slideInlineSize={size === "large" ? "12.5rem" : "6.25rem"}
      >
        {data.map((recipe) => (
          <div key={recipe.id}>{recipe.title}</div>
        ))}
      </CarouselComponent>
    </div>
  );
}
