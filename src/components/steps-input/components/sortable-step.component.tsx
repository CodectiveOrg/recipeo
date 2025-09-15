import type { ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ButtonComponent from "@/components/button/button.component";
import IconComponent from "@/components/icon/icon.component";
import TextAreaComponent from "@/components/text-area/text-area.component";

import type { Step } from "@/entities/step";

import styles from "./sortable-step.module.css";

type Props = {
  step: Step;
  index: number;
  onDescriptionChange: (id: number, value: string) => void;
};

export default function SortableStepComponent({
  step,
  index,
  onDescriptionChange,
}: Props): ReactNode {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  //   function handleFileChangeLocal(e: React.ChangeEvent<HTMLInputElement>) {
  //     stopPropagation(e);
  //     const file = e.target.files?.[0] ?? null;
  //     if (file) {
  //       const url = URL.createObjectURL(file);
  //       onFileChange(step.id, url);
  //     } else {
  //       onFileChange(step.id, null);
  //     }
  //   }

  const stopPropagation = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
  };

  return (
    <li
      className={styles["step-input"]}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className={styles["first-column"]}>
        <span className={styles.circle}>{index + 1}</span>
        <IconComponent
          name="code-scan-line-duotone"
          className={styles["drag-icon"]}
          {...listeners}
        />
      </div>

      <div className={styles.upload}>
        <TextAreaComponent
          value={step.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            stopPropagation(e);
            onDescriptionChange(step.id, e.target.value);
          }}
          placeholder="Tell a little about your food"
        />
        <ButtonComponent size="medium" color="secondary">
          <label
            htmlFor={"upload-" + step.id}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <IconComponent name="camera-bold" />
            {/* <input
              id={"upload-" + step.id}
              type="file"
              accept="image/*"
              onChange={(e) => {
                stopPropagation(e);
                onFileChange(
                  step.id,
                  e.target.files ? e.target.files[0] : null,
                );
              }}
              style={{ display: "none" }}
            /> */}
          </label>
        </ButtonComponent>
      </div>
    </li>
  );
}
