import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./select.module.css";

type Props = ComponentProps<"select">;

export default function SelectComponent({
  className,
  ...otherProps
}: Props): ReactNode {
  return <select className={clsx(styles.select, className)} {...otherProps} />;
}
