import { type PropsWithChildren, type ReactNode, use, useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import IngredientInputComponent from "@/pages/create/sections/ingredients/components/ingredient-input/ingredient-input.component.tsx";

type ActiveData = {
  index: number;
  ingredient: IngredientType;
};

type Props = PropsWithChildren;

export default function IngredientsDndProvider({ children }: Props): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeData, setActiveData] = useState<ActiveData | null>(null);

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;

    setActiveData(active.data.current as ActiveData);
  };

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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData && (
          <IngredientInputComponent
            presentational
            index={activeData.index}
            ingredient={activeData.ingredient}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
