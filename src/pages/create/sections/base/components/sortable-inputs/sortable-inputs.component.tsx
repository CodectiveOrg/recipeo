import { type ReactNode, use } from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import { SectionContext } from "@/pages/create/context/section.context.ts";
import BaseInputComponent from "@/pages/create/sections/base/components/base-input/base-input.component.tsx";

import styles from "./sortable-inputs.module.css";

export default function SortableInputsComponent(): ReactNode {
  const { context } = use(SectionContext);
  const { name } = use(context);

  const { control } = useFormContext<RecipeType>();
  const { fields } = useFieldArray<RecipeType>({ control, name });

  console.log(fields);

  return (
    <SortableContext
      items={fields.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className={styles["sortable-inputs"]}>
        {fields.map((item, index) => (
          <BaseInputComponent key={item.id} index={index} item={item} />
        ))}
      </ul>
    </SortableContext>
  );
}
