import { type ReactNode } from "react";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe.ts";

import styles from "./home.module.css";

const recipe: Recipe = {
  id: 1,
  title: "Asian white noodle with extra seafood",
  description: "Lorem ipsum dolor sit amet.",
  duration: 20,
  picture: null,
  isChosen: false,
  tags: [],
  ingredients: [],
  steps: [],
  user: { username: "James Spader", picture: "" },
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  likesCount: 2,
  isLikedByCurrentUser: false,
};

export default function HomePage(): ReactNode {
  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <RecipeCardComponent recipe={recipe} />
      </main>
    </div>
  );
}
