import type { ReactNode } from "react";

import type { Step } from "@/entities/step.ts";

import TypographyComponent from "../typography/typography.component";

import styles from "./steps-section.module.css";

type Props = {
  steps: Step[];
};

export default function StepsSectionComponent({ steps }: Props): ReactNode {
  return (
    <div className={styles["steps-section"]}>
      <TypographyComponent variant="h2">Steps</TypographyComponent>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <TypographyComponent variant="s" className={styles.counter}>
            {index + 1}
          </TypographyComponent>
          <div className={styles.description}>
            <TypographyComponent as="span" variant="p2">
              {step.description}
            </TypographyComponent>
            {step.picture ? <img src={step.picture} alt="" /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
