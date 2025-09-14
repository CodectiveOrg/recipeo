import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import RecipesCarouselSection from "@/sections/recipes-carousel/recipes-carousel.section.tsx";

import { getPopularRecipesApi } from "@/api/public/get-popularRecipes.api.ts";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const getPopularRecipesQueryResult = useQuery({
    queryKey: ["popular-recipes"],
    queryFn: getPopularRecipesApi,
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <RecipesCarouselSection
          title="Popular Recipes"
          viewAllHref="/popular"
          queryResult={getPopularRecipesQueryResult}
        />
        <br />
        <RecipesCarouselSection
          title="Popular Recipes"
          viewAllHref="/popular"
          queryResult={getPopularRecipesQueryResult}
          size="small"
        />
      </main>
    </div>
  );
}
