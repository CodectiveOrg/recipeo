import type { ReactNode } from "react";

import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { useGreetingsHook } from "@/hooks/use-greetings.hook.ts";

import styles from "./greetings.module.css";

type Props = {
  userName: string;
};

export default function GreetingsSection({ userName }: Props): ReactNode {
  const { message, icon } = useGreetingsHook();

  return (
    <div className={styles["greetings-section"]}>
      <IconComponent name={icon} />
      <TypographyComponent variant="s">{message}</TypographyComponent>
      <TypographyComponent className={styles.username} variant="h2">
        {userName}
      </TypographyComponent>
    </div>
  );
}
