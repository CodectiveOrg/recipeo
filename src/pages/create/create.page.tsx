import { type ReactNode } from "react";

import { Link } from "react-router";

import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import RecipeFormComponent from "@/pages/create/components/recipe-form/recipe-form.component.tsx";

import styles from "./create.module.css";

export default function CreatePage(): ReactNode {
  return (
    <div className={styles.create}>
      <TitleComponent>Create</TitleComponent>
      <header>
        <TypographyComponent as={Link} to="/" variant="h2">
          Cancel
        </TypographyComponent>
      </header>
      <main>
        <RecipeFormComponent />
      </main>
    </div>
  );
}
