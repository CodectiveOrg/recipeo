import { type ReactNode, use } from "react";

import ButtonComponent from "@/components/button/button.component.tsx";

import { SectionContext } from "@/pages/create/context/section.context.ts";

import styles from "./add-button.module.css";

export default function AddButtonComponent(): ReactNode {
  const { context } = use(SectionContext);
  const {
    label,
    generate,
    fieldArray: { append },
  } = use(context);

  const handleButtonClick = (): void => {
    append(generate());
  };

  return (
    <ButtonComponent
      className={styles["add-more-button"]}
      shape="rounded"
      variant="solid"
      color="secondary"
      size="small"
      onClick={handleButtonClick}
    >
      <span className={styles.icon}>+</span>
      Add Another {label}
    </ButtonComponent>
  );
}
