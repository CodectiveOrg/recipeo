import { type ReactNode } from "react";

import clsx from "clsx";

import ImageComponent from "@/components/image/image.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { User } from "@/entities/user.ts";

import styles from "./settings-head.module.css";

type Props = { user: User; className: string };

export default function SettingsHeadComponent({
  user,
  className,
}: Props): ReactNode {
  console.log("pic", user.picture);
  return (
    <div className={clsx(styles["settings-head"], styles.section, className)}>
      <ImageComponent
        className={styles.picture}
        folder="user"
        src={user.picture}
        alt=""
      />
      <TypographyComponent as="h1" variant="h1" className={styles.username}>
        {user?.username}
      </TypographyComponent>
      <TypographyComponent as="h2" variant="p2" className={styles.email}>
        {user?.email}
      </TypographyComponent>
    </div>
  );
}
