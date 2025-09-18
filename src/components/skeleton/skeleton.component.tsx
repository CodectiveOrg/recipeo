import type { CSSProperties, ReactNode } from "react";

import clsx from "clsx";

import styles from "./skeleton.module.css";

type Props = {
  className?: string;
  style?: CSSProperties;
  blockSize?: string | number;
  inlineSize?: string | number;
};

export default function SkeletonComponent({
  className,
  style,
  blockSize,
  inlineSize,
}: Props): ReactNode {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{ blockSize, inlineSize, ...style }}
    >
      &nbsp;
    </div>
  );
}
