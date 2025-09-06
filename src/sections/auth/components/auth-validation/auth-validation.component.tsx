import type { ReactNode } from "react";

import clsx from "clsx";

import CheckIcon from "@/icons/check.icon.tsx";
import { type ParsedRule } from "@/sections/auth/hooks/use-auth-validation.hook.ts";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./auth-validation.module.css";

type Props = {
  rules: ParsedRule[];
};

export default function AuthValidationComponent({ rules }: Props): ReactNode {
  return (
    <div className={styles["auth-validation"]}>
      <TypographyComponent p variant="p1">
        Your Password must contain:
      </TypographyComponent>
      <ul className={styles.rules}>
        {rules.map((rule, index) => (
          <li
            key={index}
            className={clsx(styles.rule, rule.isValid && styles.valid)}
          >
            <span className={styles.circle}>
              <CheckIcon />
            </span>
            <TypographyComponent p variant="p2">
              {rule.title}
            </TypographyComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
