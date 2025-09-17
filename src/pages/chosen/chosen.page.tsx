import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
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

  const navigate = useNavigate();

  return (
    <div className={styles.chosen}>
      <header>
        <IconButtonComponent
          className={styles["back-button"]}
          onClick={() => navigate(-1)}
        >
          <IconComponent name="alt-arrow-left-linear" />
        </IconButtonComponent>
        <TypographyComponent variant="h2" className={styles.title}>
          Editor's Chosen Recipes
        </TypographyComponent>
      </header>
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
