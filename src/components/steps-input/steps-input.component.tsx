import { type ReactNode, useState } from "react";

import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ButtonComponent from "@/components/button/button.component";
import IconComponent from "@/components/icon/icon.component";
import SortableStepComponent from "@/components/steps-input/components/sortable-step.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { Step } from "@/entities/step";

import DndProvider from "@/providers/dndProvider/dnd.provider";

import styles from "./steps-input.module.css";

export default function StepsInputComponent(): ReactNode {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      description: "",
      picture: null,
    },
  ]);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDescriptionChange = (id: number, value: string): void => {
    setSteps((steps) =>
      steps.map((step) =>
        step.id === id ? { ...step, description: value } : step,
      ),
    );
  };

  const handleFileChange = (id: number, fileUrl: string | null): void => {
    setSteps((steps) =>
      steps.map((step) =>
        step.id === id ? { ...step, picture: fileUrl } : step,
      ),
    );
  };

  const handleAddStep = (): void => {
    setSteps((steps) => [
      ...steps,
      {
        id: steps.length > 0 ? steps[steps.length - 1].id + 1 : 1,
        description: "",
        picture: null,
      },
    ]);
  };

  const handleDeleteStep = (id: number): void => {
    setSteps((steps) => steps.filter((step) => step.id !== id));
  };

  return (
    <div className={styles.steps}>
      <TypographyComponent as="h2" variant="h2">
        Steps
      </TypographyComponent>
      <DndProvider onDragEnd={handleDragEnd}>
        <SortableContext
          items={steps.map((step) => step.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles["step-section"]}>
            {steps.map((step, index) => (
              <SortableStepComponent
                key={step.id}
                step={step}
                index={index}
                onDescriptionChange={handleDescriptionChange}
                onFileChange={handleFileChange}
                onDeleteStep={handleDeleteStep}
              />
            ))}
          </ul>
        </SortableContext>
      </DndProvider>

      <ButtonComponent
        variant="outlined"
        color="secondary"
        size="medium"
        onClick={handleAddStep}
      >
        <IconComponent name="add-square-linear" /> Steps
      </ButtonComponent>
    </div>
  );
}
