import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getChosenApi } from "@/api/recipe/get-chosen.api";

import LoadingComponent from "@/components/loading/loading.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import styles from "./editors-choice.module.css";

export default function EditorsChoiceComponent(): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: ["chosen-recipe"],
    queryFn: getChosenApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }
  return (
    <ul className={styles["editors-choice"]}>
      {data &&
        data.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCardComponent recipe={recipe} />
          </li>
        ))}
    </ul>
  );
}
