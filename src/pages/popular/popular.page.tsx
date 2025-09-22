import { type ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { useInfiniteRecipesQuery } from "@/queries/use-infinite-recipes.query.ts";

import styles from "./popular.module.css";

export default function PopularPage(): ReactNode {
  const queryResult = useInfiniteRecipesQuery("popular");

  return (
    <div className={styles.popular}>
      <TitleComponent>Popular Recipes</TitleComponent>
      <HeaderWithBackButtonComponent title="Popular Recipes" />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
