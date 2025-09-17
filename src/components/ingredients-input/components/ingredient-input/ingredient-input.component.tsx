import type { ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TextInputComponent from "@/components/text-input/text-input.component";

import styles from "./ingredient-input.module.css";

type Props = {
  id: number;
  value: string;
  onChange: (id: number, newValue: string) => void;
  onDelete: (id: number) => void;
};
export default function IngredientInputComponent({
  id,
  value,
  onChange,
  onDelete,
}: Props): ReactNode {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={`Ingredient #${1}`}
      />
      <IconButtonComponent onClick={() => onDelete(id)}>
        <IconComponent name="trash-bin-trash-linear" color="danger" />
      </IconButtonComponent>
    </li>
  );
}
