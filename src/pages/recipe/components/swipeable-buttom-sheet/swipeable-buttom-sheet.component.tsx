import { type ReactNode, useEffect, useRef, useState } from "react";

import IngredientsSection from "@/sections/ingredients/ingredients.section";
import StepsSection from "@/sections/steps/steps.section";

import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";
import UserBadgeComponent from "@/components/user-badge/user-badge.component";

import type { Recipe } from "@/entities/recipe";

import { formatDuration } from "@/utils/format.utils";

import styles from "./swipeable-buttom-sheet.module.css";

type Props = {
  recipe: Recipe;
};

export default function SwipeableButtomSheetComponent({
  recipe,
}: Props): ReactNode {
  const [height, setHeight] = useState<number>(503);
  const dragging = useRef<boolean>(false);
  const startY = useRef<number>(0);
  const startHeight = useRef<number>(height);

  const onDragStart = (clientY: number): void => {
    dragging.current = true;
    startY.current = clientY;
    startHeight.current = height;
    document.body.style.userSelect = "none";
  };

  const onDragMove = (clientY: number): void => {
    if (!dragging.current) return;
    let newHeight = startHeight.current - (clientY - startY.current);
    newHeight = Math.max(120, Math.min(window.innerHeight - 32, newHeight));
    setHeight(newHeight);
  };

  const onDragEnd = (): void => {
    dragging.current = false;
    document.body.style.userSelect = "";
  };

  const onMouseDown = (e: React.MouseEvent): void => onDragStart(e.clientY);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void => onDragMove(e.clientY);
    const onMouseUp = (): void => onDragEnd();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return (): void => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent): void =>
    onDragStart(e.touches[0].clientY);

  useEffect(() => {
    const onTouchMove = (e: TouchEvent): void => {
      if (!dragging.current) return;
      onDragMove(e.touches[0].clientY);
    };
    const onTouchEnd = (): void => onDragEnd();

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return (): void => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div className={styles.sheet} style={{ height: `${height / 16}rem` }}>
      <div
        className={styles["drag-handle"]}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <span className={styles.drag}></span>
      </div>
      <div className={styles["sheet-content"]}>
        <div className={styles["section-one"]}>
          <div className={styles["recipe-info"]}>
            <TypographyComponent as="h2" variant="h2">
              {recipe.title}
            </TypographyComponent>
            <TypographyComponent as="p" variant="p2" color="text-secondary">
              Food Duration: {formatDuration(recipe.duration)}
            </TypographyComponent>
          </div>

          <div className={styles["user-info"]}>
            <UserBadgeComponent
              className={styles["user-badge"]}
              user={recipe.user}
            />
            <div className={styles.like}>
              <span className={styles.icon}>
                <IconComponent name="heart-angle-bold" />
              </span>
              <TypographyComponent as="h3" variant="h3">
                {recipe.likesCount} Likes
              </TypographyComponent>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles["section-two"]}>
          <TypographyComponent as="h2" variant="h2">
            Description
          </TypographyComponent>
          <TypographyComponent
            as="p"
            variant="p2"
            color="text-secondary"
            className={styles.description}
          >
            <span dangerouslySetInnerHTML={{ __html: recipe.description }} />
          </TypographyComponent>
        </div>
        <hr />
        <IngredientsSection ingredients={recipe.ingredients} />
        <hr />
        <StepsSection steps={recipe.steps} />
      </div>
    </div>
  );
}
