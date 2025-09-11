import { type ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getChosenApi } from "@/api/recipe/get-chosen.api";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./editors-choice.module.css";

export default function EditorsChoiceComponent(): ReactNode {
  const { data } = useQuery({
    queryKey: ["editors-choice"],
    queryFn: getChosenApi,
  });

  return (
    <div className={styles["editors-choice"]}>
      <header>
        <TypographyComponent as="span" variant="h2">
          Editor's Choice
        </TypographyComponent>
        <Link to="#">
          <TypographyComponent variant="p2">View All</TypographyComponent>
        </Link>
      </header>
      <ul>
        {data &&
          data.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCardComponent recipe={recipe} />
            </li>
          ))}
      </ul>
    </div>
  );
}
