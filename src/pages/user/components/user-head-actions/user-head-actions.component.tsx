import type { ReactNode } from "react";

import { Link } from "react-router";

import ButtonComponent from "@/components/button/button.component.tsx";

import type { GetUserResponseDto } from "@/dto/response/get-user.response.dto.ts";
import type { VerifyResponseDto } from "@/dto/response/verify.response.dto.ts";

import FollowButtonComponent from "@/pages/user/components/follow-button/follow-button.component.tsx";
import SignOutButtonComponent from "@/pages/user/components/sign-out-button/sign-out-button.component.tsx";

import styles from "./user-head-actions.module.css";

type Props = {
  currentUser: VerifyResponseDto | undefined;
  user: GetUserResponseDto;
};

export default function UserHeadActionsComponent({
  currentUser,
  user,
}: Props): ReactNode {
  if (!currentUser) {
    return (
      <ButtonComponent className={styles.button} as={Link} to="/sign-in">
        Sign In to Follow
      </ButtonComponent>
    );
  }

  if (currentUser.id === user.id) {
    return (
      <div className={styles["user-head-actions"]}>
        <SignOutButtonComponent />
        <ButtonComponent className={styles.button} as={Link} to="/settings">
          Settings
        </ButtonComponent>
      </div>
    );
  }

  return (
    <FollowButtonComponent
      className={styles.button}
      targetUserId={user.id}
      isFollowedByCurrentUser={user.isFollowedByCurrentUser}
    />
  );
}
