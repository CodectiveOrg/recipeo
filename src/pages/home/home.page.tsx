import { type ReactNode } from "react";

import PopularRecipesSection from "@/sections/popular-recipes/popular-recipes.section";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <PopularRecipesSection />
        <br />
        <PopularRecipesSection size="small" />
      </main>
    </div>
  );
}
