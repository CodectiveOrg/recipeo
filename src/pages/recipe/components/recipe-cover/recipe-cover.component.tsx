import type { ReactNode } from "react";

import ImageComponent from "@/components/image/image.component.tsx";

import BackButtonComponent from "@/pages/recipe/components/back-button/back-button.component.tsx";

import styles from "./recipe-cover.module.css";

type Props = {
  picture: string | null;
};

export default function RecipeCoverComponent({ picture }: Props): ReactNode {
  return (
    <div className={styles["recipe-cover"]}>
      <ImageComponent
        className={styles.picture}
        folder="recipe"
        src={picture}
        alt=""
      />
      <BackButtonComponent className={styles["back-button"]} />
    </div>
  );
}
