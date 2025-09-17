import { type ChangeEvent, type ReactNode, use } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import { IngredientsContext } from "@/pages/create/sections/ingredients/context/ingredients.context.ts";

import styles from "./ingredient-input.module.css";

type Props = {
  ingredient: IngredientType;
};

export default function IngredientInputComponent({
  ingredient,
}: Props): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ingredient.id });

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
      className={styles["ingredient-input"]}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <IconButtonComponent {...listeners}>
        <IconComponent name="sort-vertical-linear" />
      </IconButtonComponent>
      <TextInputComponent
        type="text"
        value={ingredient.title}
        onChange={handleTitleInputChange}
        placeholder={`Ingredient #${1}`}
      />
      <IconButtonComponent onClick={handleRemoveButtonClick}>
        <IconComponent name="trash-bin-trash-linear" color="text-secondary" />
      </IconButtonComponent>
    </li>
  );
}
