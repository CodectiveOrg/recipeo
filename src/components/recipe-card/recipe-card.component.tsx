import type { ReactNode } from "react";

import { Link } from "react-router";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import { Recipe } from "@/entities/recipe";

import styles from "./recipe-card.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeCardComponent({ recipe }: Props): ReactNode {
  return (
    <Link className={styles["recipe-card"]} to="#">
      <img src={recipe.picture || "/placeholder/featured.webp"} alt="" />
      <div className={styles.wrapper}>
        <div className={styles.writings}>
          <TypographyComponent
            as="p"
            variant="p1"
            color="text-secondary"
            ellipsis
          >
            {recipe.title}
          </TypographyComponent>
          <span className={styles.user}>
            <img
              src={recipe.user.picture || "/placeholders/user.svg"}
              alt="User's Profile Picture"
            />
            <TypographyComponent
              as="span"
              ellipsis
              className={styles.username}
              variant="s"
            >
              {recipe.user.username}
            </TypographyComponent>
          </span>
        </div>
        <IconButtonComponent>
          <IconComponent name="arrow-right-linear" />
        </IconButtonComponent>
      </div>
    </Link>
  );
}
