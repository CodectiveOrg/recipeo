import { type ReactNode, use } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import ButtonComponent from "@/components/button/button.component.tsx";

import { SectionContext } from "@/pages/create/context/section.context.ts";

import styles from "./add-button.module.css";

export default function AddButtonComponent(): ReactNode {
  const { context } = use(SectionContext);
  const { name, label, generate } = use(context);

  const { control } = useFormContext<RecipeType>();
  const { append } = useFieldArray<RecipeType>({ control, name });

  const handleButtonClick = (): void => {
    append(generate());
  };

  return (
    <ButtonComponent
      className={styles["add-more-button"]}
      shape="rounded"
      variant="solid"
      color="secondary"
      size="small"
      onClick={handleButtonClick}
    >
      <span className={styles.icon}>+</span>
      Add Another {label}
    </ButtonComponent>
  );
}
