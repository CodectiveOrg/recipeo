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

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import { SectionContext } from "@/pages/create/context/section.context.ts";
import BaseInputComponent from "@/pages/create/sections/base/components/base-input/base-input.component.tsx";

type ActiveData = {
  index: number;
  item: never;
};

type Props = PropsWithChildren;

export default function BaseDndProvider({ children }: Props): ReactNode {
  const { context } = use(SectionContext);
  const { name } = use(context);

  const { control } = useFormContext<RecipeType>();
  const { move } = useFieldArray<RecipeType>({ control, name });

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

    move(active.data.current!.index, over.data.current!.index);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData && <BaseInputComponent {...activeData} presentational />}
      </DragOverlay>
    </DndContext>
  );
}
