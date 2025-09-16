import type { ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TextInputComponent from "@/components/text-input/text-input.component";

import styles from "./sortable-input.module.css";

type Props = {
  id: number;
  value: string;
  onChange: (id: number, newValue: string) => void;
  onDelete: (id: number) => void;
};
export default function SortableInputComponent({
  id,
  value,
  onChange,
  onDelete,
}: Props): ReactNode {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  return (
    <li
      ref={setNodeRef}
      className={styles["input-item"]}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className={styles["aside-actions"]}>
        <IconButtonComponent {...listeners}>
          <IconComponent name="code-scan-line-duotone" />
        </IconButtonComponent>
        <IconButtonComponent onClick={() => onDelete(id)}>
          <IconComponent name="trash-bin-minimalistic-linear" color="danger" />
        </IconButtonComponent>
      </div>
      <TextInputComponent
        type="text"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="Enter ingredient"
      />
    </li>
  );
}
