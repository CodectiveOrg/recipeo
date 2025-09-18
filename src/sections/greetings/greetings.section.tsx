import type { ReactNode } from "react";

import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component.tsx";

import { useGreetingsHook } from "@/hooks/use-greetings.hook.ts";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import styles from "./greetings.module.css";

export default function GreetingsSection(): ReactNode {
  const { data: user, isPending } = useVerifyQuery();

  const { message, icon } = useGreetingsHook();

  return (
    <div className={styles["greetings-section"]}>
      <IconComponent name={icon} />
      <TypographyComponent variant="s">{message}</TypographyComponent>
      {isPending ? (
        <TypographySkeleton
          className={styles.username}
          variant="h2"
          inlineSize={180}
        />
      ) : (
        <TypographyComponent className={styles.username} variant="h2">
          {user?.username ?? "..."}
        </TypographyComponent>
      )}
    </div>
  );
}
