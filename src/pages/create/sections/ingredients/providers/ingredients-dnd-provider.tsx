import { type PropsWithChildren, type ReactNode, use } from "react";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";

type Props = PropsWithChildren;

export default function IngredientsDndProvider({ children }: Props): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (!(over && active.id !== over.id)) {
      return;
    }

    setIngredients((old) => {
      const oldIndex = old.findIndex((x) => x.id === active.id);
      const newIndex = old.findIndex((x) => x.id === over.id);
      return arrayMove(old, oldIndex, newIndex);
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}
