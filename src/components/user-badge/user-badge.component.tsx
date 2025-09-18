import type { PointerEvent, ReactNode } from "react";

import { Link, useNavigate } from "react-router";

import clsx from "clsx";

import ImageComponent, {
  ImageSkeleton,
} from "@/components/image/image.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component.tsx";

import type { EssentialUser } from "@/entities/user.ts";

import styles from "./user-badge.module.css";

type Props = {
  link?: boolean;
  className?: string;
  user: EssentialUser;
  size?: "medium" | "large";
};

export default function UserBadgeComponent({
  link,
  className,
  user,
  size = "medium",
}: Props): ReactNode {
  const navigate = useNavigate();

  const Component = link ? Link : "button";

  const href = `/user/${user?.id}`;

  const handleButtonPointerDown = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();

    navigate(href);
  };

  return (
    <Component
      className={clsx(styles["user-badge"], styles[size], className)}
      to={href}
      onPointerDown={link ? undefined : handleButtonPointerDown}
    >
      <ImageComponent
        className={styles.picture}
        folder="user"
        src={user?.picture}
        alt=""
      />
      <TypographyComponent
        as="span"
        ellipsis
        variant={size === "medium" ? "s" : "h3"}
      >
        {user?.username}
      </TypographyComponent>
    </Component>
  );
}

export function UserBadgeSkeleton({
  className,
  size = "medium",
}: Partial<Props>): ReactNode {
  return (
    <span className={clsx(styles["user-badge"], styles[size], className)}>
      <ImageSkeleton className={styles.picture} />
      <TypographySkeleton inlineSize={60} />
    </span>
  );
}
