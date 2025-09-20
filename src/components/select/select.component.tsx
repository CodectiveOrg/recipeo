import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./select.module.css";

type Props = ComponentProps<"select"> & {
  state?: "idle" | "success" | "error";
};

export default function SelectComponent({
  className,
  state = "idle",
  ...otherProps
}: Props): ReactNode {
  return (
    <select
      className={clsx(styles.select, styles[state], className)}
      {...otherProps}
    />
  );
}
