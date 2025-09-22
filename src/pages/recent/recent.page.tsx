import { type ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { useInfiniteRecipesQuery } from "@/queries/use-infinite-recipes.query.ts";

import styles from "./recent.module.css";

export default function RecentPage(): ReactNode {
  const queryResult = useInfiniteRecipesQuery("recent");

  return (
    <div className={styles.recent}>
      <TitleComponent>Recent Recipes</TitleComponent>
      <HeaderWithBackButtonComponent title="Recent Recipes" />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
