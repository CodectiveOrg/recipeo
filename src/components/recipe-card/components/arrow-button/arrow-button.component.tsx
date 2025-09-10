import type { ReactNode } from "react";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";

import styles from "./arrow-button.module.css";

type Props = {
  className?: string;
};

export default function ArrowButtonComponent({ className }: Props): ReactNode {
  return (
    <div className={clsx(styles["arrow-button"], className)}>
      <IconComponent name="map-arrow-right-bold" />
    </div>
  );
}
