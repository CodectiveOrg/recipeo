import { type ReactNode } from "react";

import IngredientsSection from "./sections/ingredients/ingredients.section.tsx";

import styles from "./create.module.css";

export default function CreatePage(): ReactNode {
  return (
    <div className={styles.home}>
      <header>Create Page</header>
      <main>
        <IngredientsSection />
      </main>
    </div>
  );
}
