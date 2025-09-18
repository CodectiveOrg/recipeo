import type {
  CSSProperties,
  ComponentProps,
  ElementType,
  ReactNode,
} from "react";

import clsx from "clsx";

import SkeletonComponent from "@/components/skeleton/skeleton.component.tsx";

import type { Combine } from "@/utils/type.utils.ts";

import styles from "./typography.module.css";

type Props<T extends ElementType> = {
  as?: T;
  ellipsis?: boolean;
  className?: string;
  style?: CSSProperties;
  variant: "h1" | "h2" | "h3" | "p1" | "p2" | "s";
  color?: "inherit" | "primary" | "text" | "text-secondary";
  maxLines?: number;
};

type CombinedProps<T extends ElementType> = Combine<
  ComponentProps<T>,
  Props<T>
>;

export default function TypographyComponent<T extends ElementType = "div">({
  as,
  ellipsis = false,
  className,
  style,
  variant,
  color = "inherit",
  maxLines,
  ...otherProps
}: CombinedProps<T>): ReactNode {
  const Component = as ?? "div";

  const maxLinesStyle: CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: `${maxLines}`,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <Component
      className={clsx(
        styles.typography,
        ellipsis && styles.ellipsis,
        variant,
        styles[color],
        className,
      )}
      style={{
        ...(maxLines ? maxLinesStyle : {}),
        ...style,
      }}
      {...otherProps}
    />
  );
}

export const TypographySkeleton = SkeletonComponent;
