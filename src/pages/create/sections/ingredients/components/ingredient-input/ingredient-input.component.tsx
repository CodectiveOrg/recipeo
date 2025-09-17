import { type ChangeEvent, type ReactNode, use } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import clsx from "clsx";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import { IngredientsContext } from "@/pages/create/sections/ingredients/context/ingredients.context.ts";

import styles from "./ingredient-input.module.css";

type Props = {
  index: number;
  ingredient: IngredientType;
};

export default function IngredientInputComponent({
  index,
  ingredient,
}: Props): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: ingredient.id });

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIngredients((old) =>
      old.map((x) => {
        if (x.id !== ingredient.id) {
          return x;
        }

        return { ...x, title: e.currentTarget.value };
      }),
    );
  };

  const handleRemoveButtonClick = (): void => {
    setIngredients((old) => old.filter((x) => x.id !== ingredient.id));
  };

  return (
    <li
      ref={setNodeRef}
      className={clsx(styles["ingredient-input"], isSorting && styles.sorting)}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <IconButtonComponent {...listeners}>
        <IconComponent name="sort-vertical-linear" color="text-secondary" />
      </IconButtonComponent>
      <TextInputComponent
        type="text"
        value={ingredient.title}
        onChange={handleTitleInputChange}
        placeholder={`Ingredient ${index + 1}`}
      />
      {index !== 0 && (
        <IconButtonComponent
          className={styles["remove-button"]}
          onClick={handleRemoveButtonClick}
        >
          <IconComponent name="trash-bin-trash-linear" color="text-secondary" />
        </IconButtonComponent>
      )}
    </li>
  );
}
