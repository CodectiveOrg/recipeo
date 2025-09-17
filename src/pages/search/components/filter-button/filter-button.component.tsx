import type { ReactNode, RefObject } from "react";

import clsx from "clsx";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";

import styles from "./filter-button.module.css";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
  className?: string;
};

export default function FilterButtonComponent({
  ref,
  className,
}: Props): ReactNode {
  const handleFilterButtonClick = () => {
    ref?.current?.showModal();
  };

  return (
    <IconButtonComponent
      className={clsx(styles["filter-button"], className)}
      onClick={handleFilterButtonClick}
    >
      <IconComponent name="filter-outline" />
    </IconButtonComponent>
  );
}
