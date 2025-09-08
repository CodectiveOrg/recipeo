import type { ReactNode } from "react";

import clsx from "clsx";

import CheckIcon from "@/icons/check.icon.tsx";

import styles from "./check-circle.module.css";

type Props = {
  active?: boolean;
};

export default function CheckCircleComponent({ active }: Props): ReactNode {
  return (
    <span className={clsx(styles["check-circle"], active && styles.active)}>
      <CheckIcon />
    </span>
  );
}
