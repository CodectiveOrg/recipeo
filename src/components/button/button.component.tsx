import { type ComponentProps, type ElementType, type ReactNode } from "react";

import clsx from "clsx";

import SkeletonComponent from "@/components/skeleton/skeleton.component.tsx";

import type { Combine } from "@/utils/type.utils.ts";

import styles from "./button.module.css";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  shape?: "pill" | "rounded";
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
  shape = "pill",
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
        styles[shape],
        styles[variant],
        styles[size],
        styles[color],
        className,
      )}
      {...otherProps}
    />
  );
}

export function ButtonSkeleton<T extends ElementType = "button">({
  as,
  shape = "pill",
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
        styles[shape],
        styles[variant],
        styles[size],
        styles[color],
        className,
      )}
      {...otherProps}
    >
      &nbsp;
      <SkeletonComponent fill />
    </Component>
  );
}
