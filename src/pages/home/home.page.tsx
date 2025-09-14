import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import RecipesCarouselSection from "@/sections/recipes-carousel/recipes-carousel.section.tsx";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api.ts";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular"],
    queryFn: getPopularRecipesApi,
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <RecipesCarouselSection
          title="Popular Recipes"
          queryResult={popularRecipesQueryResult}
          viewAllHref="/popular"
        />
        <br />
        <RecipesCarouselSection
          title="Popular Recipes"
          queryResult={popularRecipesQueryResult}
          viewAllHref="/popular"
          size="small"
        />
      </main>
    </div>
  );
}
