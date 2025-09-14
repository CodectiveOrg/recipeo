import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import HandfulSection from "@/sections/handful/handful.section.tsx";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api.ts";

import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component.tsx";
import TagsCarouselComponent from "@/components/tags-carousel/tags-carousel.component.tsx";

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
        <HandfulSection title="Tags" viewAllHref="/tags">
          <TagsCarouselComponent />
        </HandfulSection>
        <br />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <br />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent
            queryResult={popularRecipesQueryResult}
            size="small"
          />
        </HandfulSection>
      </main>
    </div>
  );
}
