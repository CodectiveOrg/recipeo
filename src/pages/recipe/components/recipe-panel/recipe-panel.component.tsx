import type { PropsWithChildren, ReactNode } from "react";

import clsx from "clsx";

import styles from "./recipe-panel.module.css";

type Props = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

export default function RecipePanelComponent({
  className,
  contentClassName,
  children,
}: Props): ReactNode {
  return (
    <div className={clsx(styles["recipe-panel"], className)}>
      <div className={styles["drag-handle"]}>
        <span className={styles.drag}></span>
      </div>
      <div className={clsx(styles.content, contentClassName)}>{children}</div>
    </div>
  );
}
