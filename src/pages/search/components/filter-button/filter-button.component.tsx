import type { ReactNode, RefObject } from "react";

import clsx from "clsx";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";

import styles from "./filter-button.module.css";

type Props = {
  formDrawerRef: RefObject<HTMLDialogElement | null>;
  className?: string;
};

export default function FilterButtonComponent({
  formDrawerRef,
  className,
}: Props): ReactNode {
  const handleFilterButtonClick = (): void => {
    formDrawerRef?.current?.showModal();
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
