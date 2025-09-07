import type { ComponentProps, ReactNode } from "react";

import { Link, useNavigate } from "react-router";

import ButtonComponent from "@/components/button/button.component";
import ModalComponent from "@/components/modal/modal.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./success-modal.module.css";

type Props = {
  ref: ComponentProps<typeof ModalComponent>["ref"];
};

export default function SuccessModalComponent({ ref }: Props): ReactNode {
  const navigate = useNavigate();

  const navigateToHomePage = (): void => {
    navigate("/");
  };

  return (
    <ModalComponent
      ref={ref}
      dismissOnBackdropClick={false}
      className={styles["success-modal"]}
      contentClassName={styles.content}
      onClose={navigateToHomePage}
      onCancel={navigateToHomePage}
    >
      <img src="/emoji/partying-face.webp" alt="" />
      <div className={styles.writings}>
        <TypographyComponent variant="h1">Upload Success</TypographyComponent>
        <TypographyComponent as="p" variant="p2" color="text-secondary">
          Your recipe has been uploaded, you can see it on your profile.
        </TypographyComponent>
      </div>
      <ButtonComponent as={Link} to="/">
        Back to Home
      </ButtonComponent>
    </ModalComponent>
  );
}
