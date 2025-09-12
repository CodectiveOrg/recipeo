import type { ComponentProps, MouseEvent, ReactNode, RefObject } from "react";

import clsx from "clsx";

import styles from "./drawer.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  dismissOnBackdropClick?: boolean;
  contentClassName?: string;
};

export default function DrawerComponent({
  ref,
  className,
  contentClassName,
  dismissOnBackdropClick = true,
  onClick,
  children,
  ...otherProps
}: Props): ReactNode {
  const handleClick = (e: MouseEvent<HTMLDialogElement>): void => {
    if (dismissOnBackdropClick && e.currentTarget === e.target) {
      ref?.current?.close();
    } else {
      onClick?.(e);
    }
  };

  return (
    <dialog
      ref={ref}
      className={clsx(styles.drawer, className)}
      onClick={handleClick}
      {...otherProps}
    >
      <div className={contentClassName}>{children}</div>
    </dialog>
  );
}
