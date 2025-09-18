import { type ReactNode } from "react";

import RecipeFormComponent from "@/pages/create/components/recipe-form/recipe-form.component.tsx";

import styles from "./create.module.css";

export default function CreatePage(): ReactNode {
  return (
    <div className={styles.home}>
      <title>Create Recipe</title>
      <header>Create Page</header>
      <main>
        <RecipeFormComponent />
      </main>
    </div>
  );
}
