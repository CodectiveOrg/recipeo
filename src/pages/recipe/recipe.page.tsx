import type { ReactNode } from "react";

import { useNavigate, useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getRecipeApi } from "@/api/recipe/get-recipe.api";

import ImageComponent from "@/components/image/image.component";

import BackButtonComponent from "./components/back-button/back-button.component";
import SwipeableButtomSheetComponent from "./components/swipeable-buttom-sheet/swipeable-buttom-sheet.component";

import styles from "./recipe.module.css";

export default function RecipePage(): ReactNode {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { data: recipe } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeApi({ recipeId: recipeId! }),
    enabled: Boolean(recipeId),
  });

  if (!recipe) return navigate("/") as any;
  return (
    <div className={styles.recipe}>
      <main>
        <ImageComponent
          src={recipe.picture!}
          folder="recipe"
          className={styles["cover-img"]}
        />
        <BackButtonComponent />
        <SwipeableButtomSheetComponent recipe={recipe} />
      </main>
    </div>
  );
}
