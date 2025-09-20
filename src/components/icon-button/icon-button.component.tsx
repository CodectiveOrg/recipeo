import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./icon-button.module.css";

type Props = ComponentProps<"button">;

export default function IconButtonComponent({
  className,
  children,
  ...otherProps
}: Props): ReactNode {
  return (
    <button
      className={clsx(styles["icon-button"], className)}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export function IconButtonSkeleton({
  className,
  children,
  ...otherProps
}: Props): ReactNode {
  return (
    <span
      className={clsx(styles["icon-button"], className)}
      type="button"
      {...otherProps}
    >
      {children}
    </span>
  );
}
