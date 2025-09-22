import type { ReactElement } from "react";

import { Icon, type IconProps } from "@iconify/react";

import clsx from "clsx";

import SkeletonComponent from "@/components/skeleton/skeleton.component.tsx";

import styles from "./icon.module.css";

type Props = Omit<IconProps, "icon" | "ssr" | "color"> & {
  collection?: "solar";
  name: string;
  color?: "inherit" | "text" | "text-secondary" | "primary" | "danger";
};

export default function IconComponent({
  collection = "solar",
  name,
  color = "inherit",
  inline = true,
  className,
  ...otherProps
}: Props): ReactElement {
  const iconId = `${collection}:${name}`;

  return (
    <Icon
      icon={iconId}
      className={clsx(styles.icon, styles[color], className)}
      inline={inline}
      {...otherProps}
    />
  );
}

export function IconSkeleton({ className }: Partial<Props>): ReactElement {
  return (
    <SkeletonComponent
      className={clsx(styles.icon, className)}
      style={{ borderRadius: "999rem" }}
      inlineSize="1em"
      blockSize="1em"
    />
  );
}
