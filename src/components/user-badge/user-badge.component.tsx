import type { ComponentProps, ElementType, ReactNode } from "react";

import clsx from "clsx";

import ImageComponent from "@/components/image/image.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { EssentialUser } from "@/entities/user.ts";

import type { Combine } from "@/utils/type.utils.ts";

import styles from "./user-badge.module.css";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  user: EssentialUser;
  size?: "medium" | "large";
};

type CombinedProps<T extends ElementType> = Combine<
  Omit<ComponentProps<T>, "to">,
  Props<T>
>;

export default function UserBadgeComponent<T extends ElementType = "button">({
  as,
  className,
  user,
  size = "medium",
  ...otherProps
}: CombinedProps<T>): ReactNode {
  const Component = as ?? "button";

  return (
    <Component
      className={clsx(styles["user-badge"], styles[size], className)}
      to={`/user/${user?.id}`}
      {...otherProps}
    >
      <ImageComponent folder="user" src={user?.picture} alt="" />
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
