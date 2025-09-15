import type { PropsWithChildren, ReactNode } from "react";

import clsx from "clsx";

import styles from "./recipe-panel.module.css";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function RecipePanelComponent({
  className,
  children,
}: Props): ReactNode {
  return (
    <div className={clsx(styles["recipe-panel"], className)}>
      <div className={styles["drag-handle"]}>
        <span className={styles.drag}></span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
