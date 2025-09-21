import { type ReactNode, useRef, useState } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import SuccessModalComponent from "@/components/success-modal/success-modal.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import RecipeFormComponent from "@/pages/create/components/recipe-form/recipe-form.component.tsx";
import DataProvider from "@/pages/create/providers/data.provider.tsx";

import styles from "./create.module.css";

export default function CreatePage(): ReactNode {
  const [createdRecipeId, setCreatedRecipeId] = useState<number | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleFormSuccess = (id: number): void => {
    setCreatedRecipeId(id);
    modalRef.current?.showModal();
  };

  return (
    <DataProvider>
      <div className={styles.create}>
        <TitleComponent>Create</TitleComponent>
        <HeaderWithBackButtonComponent title="Create a New Recipe" />
        <main>
          <RecipeFormComponent onSuccess={handleFormSuccess} />
        </main>
        <SuccessModalComponent
          ref={modalRef}
          createdRecipeId={createdRecipeId}
        />
      </div>
    </DataProvider>
  );
}
