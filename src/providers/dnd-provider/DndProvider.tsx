import { type PropsWithChildren, type ReactNode } from "react";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type Props = PropsWithChildren & {
  onDragEnd: (event: DragEndEvent) => void;
};
export default function DndProvider({ onDragEnd, children }: Props): ReactNode {
  const sensors = useSensors(useSensor(PointerSensor));
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}
