import { type ReactNode, useRef } from "react";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import ModalComponent from "@/components/modal/modal.component";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./share-button.module.css";

export default function ShareButtonComponent(): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseButtonClick = (): void => {
    modalRef.current?.close();
  };

  const handleShareButtonClick = async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Share Profile",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      modalRef.current?.showModal();
    }
  };

  return (
    <>
      <IconButtonComponent
        className={styles["share-button"]}
        onClick={handleShareButtonClick}
      >
        <IconComponent name="share-bold" />
      </IconButtonComponent>
      <ModalComponent ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <TypographyComponent as="span" variant="h2" color="text">
            Share Profile
          </TypographyComponent>
          <IconButtonComponent onClick={handleCloseButtonClick}>
            <IconComponent name="close-circle-linear" color="text-secondary" />
          </IconButtonComponent>
        </div>
        <div className={styles.content}>
          <TextInputComponent
            type="text"
            readOnly
            value={window.location.href}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </ModalComponent>
    </>
  );
}
