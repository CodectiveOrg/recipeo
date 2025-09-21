import type { ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./header-with-back-button.module.css";

type Props = {
  title?: string | ReactNode;
  extra?: ReactNode;
};

export default function HeaderWithBackButtonComponent({
  title,
  extra,
}: Props): ReactNode {
  return (
    <header className={styles["header-with-back-button"]}>
      <BackButtonComponent className={styles["back-button"]} />
      {typeof title === "string" ? (
        <TypographyComponent variant="h2" className={styles.title}>
          {title}
        </TypographyComponent>
      ) : (
        <div className={styles["custom-title"]}>{title}</div>
      )}
      {extra && <div className={styles.extra}>{extra}</div>}
    </header>
  );
}
