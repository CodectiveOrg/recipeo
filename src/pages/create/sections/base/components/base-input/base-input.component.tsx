import { type ReactNode, use } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useFieldArray, useFormContext } from "react-hook-form";

import clsx from "clsx";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";
import type { BaseItem } from "@/pages/create/context/base.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";

import styles from "./base-input.module.css";

type Props<T extends BaseItem> = {
  presentational?: boolean;
  index: number;
  item: T;
};

export default function BaseInputComponent<T extends BaseItem>({
  presentational,
  index,
  item,
}: Props<T>): ReactNode {
  const { context } = use(SectionContext);
  const { name, layout, Component } = use(context);

  const { control } = useFormContext<RecipeType>();
  const { fields, remove } = useFieldArray<RecipeType>({ control, name });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
    isDragging,
  } = useSortable({ id: item.id, data: { index, item } });

  const {
    formState: { errors },
  } = useFormContext<RecipeType>();

  const handleRemoveButtonClick = (): void => {
    const index = fields.findIndex((x) => x.id === item.id);
    remove(index);
  };

  return (
    <li
      ref={setNodeRef}
      className={clsx(
        styles["base-input"],
        styles[layout],
        presentational && styles.presentational,
        isSorting && styles.sorting,
        isDragging && styles.dragging,
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <span className={styles.component}>
        <Component index={index} />
      </span>
      <span className={styles.number}>{index + 1}</span>
      <IconButtonComponent className={styles["drag-handle"]} {...listeners}>
        <IconComponent name="sort-vertical-linear" color="text-secondary" />
      </IconButtonComponent>
      {index !== 0 && (
        <IconButtonComponent
          className={styles["remove-button"]}
          onClick={handleRemoveButtonClick}
        >
          <IconComponent name="trash-bin-trash-linear" color="text-secondary" />
        </IconButtonComponent>
      )}
      <RecipeFormErrorComponent message={errors.ingredients?.message} />
    </li>
  );
}
