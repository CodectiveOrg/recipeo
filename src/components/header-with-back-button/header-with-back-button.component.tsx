import type { ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./header-with-back-button.module.css";

type Props = {
  title?: string;
  extra?: ReactNode;
};

export default function HeaderWithBackButtonComponent({
  title,
  extra,
}: Props): ReactNode {
  return (
    <header className={styles["header-with-back-button"]}>
      <BackButtonComponent className={styles["back-button"]} />
      <TypographyComponent variant="h2" className={styles.title}>
        {title}
      </TypographyComponent>
      {extra && <div className={styles.extra}>{extra}</div>}
    </header>
  );
}
