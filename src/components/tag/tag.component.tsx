import { type ReactNode, useState } from "react";

import clsx from "clsx";

import styles from "./tag.module.css";

type Props = {
  title: string;
};

export default function TagComponent({ title }: Props): ReactNode {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleTagButtonClick = (): void => {
    setIsSelected(true);
  };

  return (
    <button
      className={clsx(styles.tag, isSelected ?? styles.selected)}
      onClick={handleTagButtonClick}
    >
      {title}
    </button>
  );
}
