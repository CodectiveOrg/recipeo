import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component";

import styles from "./label.module.css";

export default function RangeInputLabelComponent(): ReactNode {
  return (
    <div className={styles.label}>
      <TypographyComponent as="span" variant="h2">
        Max Duration
      </TypographyComponent>
      <TypographyComponent as="span" variant="p1" color="text-secondary">
        (in minutes)
      </TypographyComponent>
    </div>
  );
}
