import { type ComponentProps, type ElementType, type ReactNode } from "react";

import clsx from "clsx";

import styles from "./button.module.css";

type Combine<T, K> = Omit<T, keyof K> & K;

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  variant?: "solid" | "outlined" | "text";
  color?: "primary" | "secondary" | "danger";
  size?: "large" | "medium" | "small";
};

type CombinedProps<T extends ElementType> = Combine<
  ComponentProps<T>,
  Props<T>
>;

export default function ButtonComponent<T extends ElementType = "button">({
  as,
  variant = "solid",
  color = "primary",
  size = "large",
  className,
  ...otherProps
}: CombinedProps<T>): ReactNode {
  const Component = as ?? "button";

  return (
    <Component
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[color],
        className,
      )}
      {...otherProps}
    />
  );
}
