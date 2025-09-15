import type { ChangeEvent, ReactNode, SyntheticEvent } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ButtonComponent from "@/components/button/button.component";
import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TextAreaComponent from "@/components/text-area/text-area.component";

import type { Step } from "@/entities/step";

import styles from "./sortable-step.module.css";

type Props = {
  step: Step;
  index: number;
  onDescriptionChange: (id: number, value: string) => void;
  onFileChange: (id: number, url: string | null) => void;
  onDeleteStep: (id: number) => void;
};

export default function SortableStepComponent({
  step,
  index,
  onDescriptionChange,
  onFileChange,
  onDeleteStep,
}: Props): ReactNode {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  // TODO
  const handleInputFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    handleStopPropagation(event);
    const file = event.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      onFileChange(step.id, url);
    } else {
      onFileChange(step.id, null);
    }
  };

  const handleStopPropagation = (event: SyntheticEvent): void => {
    event.stopPropagation();
  };

  return (
    <li
      className={styles.step}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className={styles["aside-step-actions"]}>
        <span className={styles.circle}>{index + 1}</span>
        <IconComponent name="code-scan-line-duotone" {...listeners} />
        <IconButtonComponent onClick={() => onDeleteStep(step.id)}>
          <IconComponent name="trash-bin-minimalistic-linear" color="danger" />
        </IconButtonComponent>
      </div>

      <div className={styles["step-content"]}>
        <TextAreaComponent
          value={step.description}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            handleStopPropagation(event);
            onDescriptionChange(step.id, event.target.value);
          }}
          placeholder="Tell a little about your food"
        />
        <ButtonComponent size="medium" color="secondary">
          <IconComponent name="camera-bold" />
          <input
            id={"upload-" + step.id}
            type="file"
            accept="image/*"
            onChange={(event) => {
              handleStopPropagation(event);
              handleInputFileChange(event);
            }}
          />
        </ButtonComponent>
      </div>
    </li>
  );
}
