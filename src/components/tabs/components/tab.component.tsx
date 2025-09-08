import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./tab.module.css";

type Props = {
  active?: boolean;
  label: string;
  onClick: ComponentProps<"button">["onClick"];
};

export default function TabComponent({
  active,
  label,
  onClick,
}: Props): ReactNode {
  return (
    <button
      className={clsx(styles.tab, active && styles.active)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
