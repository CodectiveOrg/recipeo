import { type ReactNode, useRef } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import SuccessModalComponent from "@/components/success-modal/success-modal.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import RecipeFormComponent from "@/pages/create/components/recipe-form/recipe-form.component.tsx";
import DataProvider from "@/pages/create/providers/data.provider.tsx";

import styles from "./create.module.css";

export default function CreatePage(): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleFormSubmit = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <DataProvider>
      <div className={styles.create}>
        <TitleComponent>Create</TitleComponent>
        <header>
          <BackButtonComponent className={styles["back-button"]} />
          <TypographyComponent variant="h2" className={styles.title}>
            Create
          </TypographyComponent>
        </header>
        <main>
          <RecipeFormComponent onSubmit={handleFormSubmit} />
        </main>
        <SuccessModalComponent ref={modalRef} />
      </div>
    </DataProvider>
  );
}
