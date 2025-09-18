import {
  type ChangeEvent,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { StepType } from "@/validation/schemas/step.schema.ts";

import TextAreaComponent from "@/components/text-area/text-area.component.tsx";

import UploadImageButtonComponent from "@/pages/create/sections/steps/components/upload-image-button/upload-image-button.component.tsx";

import styles from "./step-input.module.css";

type Props = {
  presentational?: boolean;
  item: StepType;
  setItems: Dispatch<SetStateAction<StepType[]>>;
};

export default function StepInputComponent({
  item,
  setItems,
}: Props): ReactNode {
  const handleDescriptionInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setItems((old) =>
      old.map((x) => {
        if (x.id !== item.id) {
          return x;
        }

        return { ...x, description: e.target.value };
      }),
    );
  };

  return (
    <div className={styles["step-input"]}>
      <TextAreaComponent
        value={item.description}
        onChange={handleDescriptionInputChange}
        placeholder="Tell a little about your food..."
      />
      <UploadImageButtonComponent stepID={item.id} />
    </div>
  );
}
