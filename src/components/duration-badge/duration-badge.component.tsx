import type { ReactNode } from "react";

import clsx from "clsx";

import IconComponent, {
  IconSkeleton,
} from "@/components/icon/icon.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component.tsx";

import { formatDuration } from "@/utils/format.utils.ts";

import styles from "./duration-badge.module.css";

type Props = {
  className?: string;
  duration: number;
};

export default function DurationBadgeComponent({
  className,
  duration,
}: Props): ReactNode {
  return (
    <span className={clsx(styles["duration-badge"], className)}>
      <IconComponent name="alarm-linear" />
      <TypographyComponent as="span" variant="s">
        {formatDuration(duration)}
      </TypographyComponent>
    </span>
  );
}

export function DurationBadgeSkeleton({
  className,
}: Partial<Props>): ReactNode {
  return (
    <span className={clsx(styles["duration-badge"], className)}>
      <IconSkeleton />
      <TypographySkeleton as="span" variant="s" inlineSize={30} />
    </span>
  );
}
