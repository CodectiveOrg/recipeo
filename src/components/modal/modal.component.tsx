import type {
  CSSProperties,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from "react";

import clsx from "clsx";

import TypographyComponent from "@/components/typography/typography.component";

import styles from "./modal.module.css";

type Props = PropsWithChildren<{
  ref: RefObject<HTMLDialogElement | null>;
  className?: string;
  contentClassName?: string;
  bodyClassName?: string;
  title: string;
  maxInlineSize?: CSSProperties["inlineSize"];
  onClose: () => void;
}>;

export default function ModalComponent({
  ref,
  className,
  contentClassName,
  bodyClassName,
  title,
  maxInlineSize = "35rem",
  onClose,
  children,
}: Props): ReactNode {
  const handleClick = (e: MouseEvent<HTMLDialogElement>): void => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  const handleClose = (): void => {
    ref?.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className={clsx(styles.modal, className)}
      style={{ inlineSize: `min(${maxInlineSize}, 100%)` }}
      onClick={handleClick}
      onClose={onClose}
    >
      <div className={clsx(styles.content, contentClassName)}>
        <header>
          <TypographyComponent variant="h1">{title}</TypographyComponent>
        </header>
        <div className={clsx(styles.body, bodyClassName)}>{children}</div>
      </div>
    </dialog>
  );
}
