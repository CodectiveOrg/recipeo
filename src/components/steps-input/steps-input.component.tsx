import type { ReactNode } from "react";

import DndProvider from "@/providers/dndProvider/dnd.provider";

import ButtonComponent from "../button/button.component";
import IconComponent from "../icon/icon.component";
import TextAreaComponent from "../text-area/text-area.component";
import TypographyComponent from "../typography/typography.component";

import styles from "./steps-input.module.css";

export default function StepsInputComponent(): ReactNode {
  return (
    <div className={styles.steps}>
      <TypographyComponent as="h2" variant="h2">
        Steps
      </TypographyComponent>
      <DndProvider>
        <div className={styles["step-input"]}>
          <div className={styles["first-column"]}>
            <span className={styles.circle}>1</span>
            <IconComponent
              name="code-scan-line-duotone"
              className={styles["drag-icon"]}
            />
          </div>

          <div className={styles.upload}>
            <TextAreaComponent placeholder="Tell a little about your food" />
            <ButtonComponent size="medium" color="secondary">
              <IconComponent name="camera-bold" />
            </ButtonComponent>
          </div>
        </div>
      </DndProvider>

      <ButtonComponent variant="outlined" color="secondary" size="medium">
        <IconComponent name="add-square-linear" /> Steps
      </ButtonComponent>
    </div>
  );
}
