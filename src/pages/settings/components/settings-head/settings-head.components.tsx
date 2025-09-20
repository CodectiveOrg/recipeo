import { type ReactNode } from "react";

import clsx from "clsx";

import PicturePickerComponent from "@/components/picture-picker/picture-picker.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { User } from "@/entities/user.ts";

import styles from "./settings-head.module.css";

type Props = { user: User; className?: string };

export default function SettingsHeadComponent({
  user,
  className,
}: Props): ReactNode {
  return (
    <div className={clsx(styles["settings-head"], styles.section, className)}>
      <PicturePickerComponent
        className={styles.picture}
        picture={user.picture}
      />
      <TypographyComponent as="h1" variant="h1" className={styles.username}>
        {user?.username}
      </TypographyComponent>
    </div>
  );
}
