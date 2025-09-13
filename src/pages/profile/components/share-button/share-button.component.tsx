import { type ReactNode, useRef, useState } from "react";

import { toast } from "react-toastify";

import ButtonComponent from "@/components/button/button.component";
import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import ModalComponent from "@/components/modal/modal.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./share-button.module.css";

export default function ShareButtonComponent(): ReactNode {
  const [shareMessage, setShareMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (): void => {
    setIsModalOpen(true);
    setTimeout(() => {
      modalRef.current?.showModal();
    }, 10);
  };

  const closeModal = (): void => {
    modalRef.current?.close();
    setIsModalOpen(false);
    setShareMessage("");
  };

  const handleShareButton = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "share Profile",
          url: window.location.href,
        });
        openModal();
      } catch (error) {
        setShareMessage(
          `Share failed: ${error instanceof Error ? error.message : String(error)}`,
        );
        openModal();
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage(
          "URL copied to clipboard (fallback for unsupported browsers).",
        );
        openModal();
      } catch {
        setShareMessage("Sharing not supported and copy failed.");
        openModal();
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("URL copied to clipboard!");
    closeModal();
  };

  return (
    <>
      <IconButtonComponent onClick={handleShareButton}>
        <IconComponent name="share-bold" className={styles.icon} />
      </IconButtonComponent>
      {isModalOpen && (
        <ModalComponent ref={modalRef} className={styles.modal}>
          <div className={styles.header}>
            <TypographyComponent as="span" variant="h2" color="text">
              share Profile
            </TypographyComponent>
            <IconButtonComponent onClick={closeModal}>
              <IconComponent
                name="close-circle-linear"
                className={styles.icon}
                color="danger"
              />
            </IconButtonComponent>
          </div>
          <div className={styles.body}>
            <TypographyComponent as="p" variant="p2">
              {shareMessage || "Share this link:"}
            </TypographyComponent>
            <input
              type="text"
              readOnly
              value={window.location.href}
              onFocus={(e) => e.target.select()}
            />
            <ButtonComponent size="small" onClick={handleCopy}>
              Copy Link
            </ButtonComponent>
          </div>
        </ModalComponent>
      )}
    </>
  );
}
