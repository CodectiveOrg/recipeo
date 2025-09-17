import { type ReactNode } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api.ts";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./featured.module.css";

export default function FeaturedPage(): ReactNode {
  const queryResult = useInfiniteQuery({
    queryKey: ["recipes", "featured"],
    queryFn: getPopularRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <div className={styles.featured}>
      <header>
        <BackButtonComponent className={styles["back-button"]} />
        <TypographyComponent variant="h2" className={styles.title}>
          Featured Recipes
        </TypographyComponent>
      </header>
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
