import { type ReactNode } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./chosen.module.css";

export default function ChosenPage(): ReactNode {
  const queryResult = useInfiniteQuery({
    queryKey: ["recipes", "chosen"],
    queryFn: getChosenRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <div className={styles.chosen}>
      <TitleComponent>Editor's Choice Recipes</TitleComponent>
      <header>
        <BackButtonComponent className={styles["back-button"]} />
        <TypographyComponent variant="h2" className={styles.title}>
          Editor's Choice Recipes
        </TypographyComponent>
      </header>
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
