import { type ReactNode, use } from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SectionContext } from "@/pages/create/context/section.context.ts";
import BaseInputComponent from "@/pages/create/sections/base/components/base-input/base-input.component.tsx";

import styles from "./sortable-inputs.module.css";

export default function SortableInputsComponent(): ReactNode {
  const { context } = use(SectionContext);
  const { items } = use(context);

  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className={styles["sortable-inputs"]}>
        {items.map((item, index) => (
          <BaseInputComponent key={item.id} index={index} item={item} />
        ))}
      </ul>
    </SortableContext>
  );
}
