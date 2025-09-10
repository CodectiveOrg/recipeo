import type { ReactNode } from "react";

import clsx from "clsx";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { EssentialUser } from "@/entities/user.ts";

import styles from "./user-badge.module.css";

type Props = {
  className?: string;
  user: EssentialUser;
};

export default function UserBadgeComponent({
  className,
  user,
}: Props): ReactNode {
  return (
    <span className={clsx(styles.user, className)}>
      <img src={user.picture || "/placeholders/user.svg"} alt="" />
      <TypographyComponent as="span" ellipsis variant="s">
        {user.username}
      </TypographyComponent>
    </span>
  );
}
