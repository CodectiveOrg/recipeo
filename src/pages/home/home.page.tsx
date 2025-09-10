import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const data = await richFetch<Recipe>("/recipe/1");

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.result;
    },
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>{data && <RecipeCardComponent recipe={data} />}</main>
    </div>
  );
}
