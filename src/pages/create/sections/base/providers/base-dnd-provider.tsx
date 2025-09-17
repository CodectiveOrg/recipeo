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

import { SectionContext } from "@/pages/create/context/section.context.ts";
import BaseInputComponent from "@/pages/create/sections/base/components/base-input/base-input.component.tsx";

type ActiveData = {
  index: number;
  item: never;
};

type Props = PropsWithChildren;

export default function BaseDndProvider({ children }: Props): ReactNode {
  const { context } = use(SectionContext);
  const { setItems } = use(context);

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

    setItems((old) => {
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
        {activeData && <BaseInputComponent {...activeData} presentational />}
      </DragOverlay>
    </DndContext>
  );
}
