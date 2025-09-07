import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { Step } from "@/entities/step.ts";

import styles from "./steps.module.css";

type Props = {
  steps: Step[];
};

export default function StepsSection({ steps }: Props): ReactNode {
  return (
    <div className={styles.steps}>
      <TypographyComponent as="h2" variant="h2">
        Steps
      </TypographyComponent>
      <ul>
        {steps.map((step, index) => (
          <li key={step.id}>
            <div className={styles.step}>
              <TypographyComponent
                as="span"
                className={styles.number}
                variant="s"
              >
                {index + 1}
              </TypographyComponent>
              <TypographyComponent as="p" variant="p2">
                {step.description}
              </TypographyComponent>
              {step.picture && <img src={step.picture} alt="" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
