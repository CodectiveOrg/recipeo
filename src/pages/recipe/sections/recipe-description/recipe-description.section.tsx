import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./recipe-description.module.css";

type Props = {
  description: string;
};

export default function RecipeDescriptionSection({
  description,
}: Props): ReactNode {
  return (
    <div className={styles["recipe-description"]}>
      <TypographyComponent as="h2" variant="h2">
        Description
      </TypographyComponent>
      <TypographyComponent
        as="p"
        variant="p2"
        color="text-secondary"
        className={styles.description}
      >
        {description}
      </TypographyComponent>
    </div>
  );
}
