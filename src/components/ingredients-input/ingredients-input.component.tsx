import { type ReactNode, useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ButtonComponent from "@/components/button/button.component";
import IconComponent from "@/components/icon/icon.component";
import SortableInputComponent from "@/components/ingredients-input/components/sortable-input/sortable-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./ingredients-input.module.css";

type Input = {
  id: number;
  value: string;
};
export default function IngredientsInputComponent(): ReactNode {
  const [inputs, setInputs] = useState<Input[]>([
    {
      id: Number(
        String(Date.now() + Math.random())
          .split(".")
          .join(""),
      ),
      value: "",
    },
  ]);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setInputs((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleChangeInput = (id: number, newValue: string): void => {
    setInputs((items) =>
      items.map((item) =>
        item.id === id ? { ...item, value: newValue } : item,
      ),
    );
  };

  const handleDeleteInput = (id: number): void => {
    setInputs((items) => items.filter((item) => item.id !== id));
  };

  const handleAddInput = (): void => {
    setInputs((items) => [
      ...items,
      {
        id: Number(
          String(Date.now() + Math.random())
            .split(".")
            .join(""),
        ),
        value: "",
      },
    ]);
  };

  return (
    <div className={styles.inputs}>
      <TypographyComponent as="h2" variant="h2">
        Ingredients
      </TypographyComponent>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={inputs.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles["input-section"]}>
            {inputs.map((item) => (
              <SortableInputComponent
                key={item.id}
                id={item.id}
                value={item.value}
                onChange={handleChangeInput}
                onDelete={handleDeleteInput}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <ButtonComponent
        variant="outlined"
        color="secondary"
        size="medium"
        onClick={handleAddInput}
      >
        <IconComponent name="add-square-linear" /> Ingredients
      </ButtonComponent>
    </div>
  );
}
