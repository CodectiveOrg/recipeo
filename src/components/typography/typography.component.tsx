import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

import clsx from "clsx";

import styles from "./typography.module.css";

type Props = PropsWithChildren<
  ({ p?: boolean; span?: never } | { p?: never; span?: boolean }) & {
    ellipsis?: boolean;
    className?: string;
    style?: CSSProperties;
    variant: "h1" | "h2" | "h3" | "p1" | "p2" | "s";
    color?: "inherit" | "primary" | "text" | "text-secondary";
    maxLines?: number;
  }
>;

export default function TypographyComponent({
  p = false,
  span = false,
  ellipsis = false,
  className,
  style,
  variant,
  color = "inherit",
  maxLines,
  children,
}: Props): ReactNode {
  const Component = p ? "p" : span ? "span" : "div";

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
    >
      {children}
    </Component>
  );
}
