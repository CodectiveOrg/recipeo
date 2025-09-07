import type { ComponentProps, MouseEvent, ReactNode, RefObject } from "react";

import clsx from "clsx";

import styles from "./modal.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  dismissOnBackdropClick?: boolean;
  contentClassName?: string;
};

export default function ModalComponent({
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
      className={clsx(styles.modal, className)}
      onClick={handleClick}
      {...otherProps}
    >
      <div className={contentClassName}>{children}</div>
    </dialog>
  );
}
