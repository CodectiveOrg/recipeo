import type { ReactNode } from "react";

import { Link, useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "@/api/user/get-user.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import ImageComponent from "@/components/image/image.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import FollowButtonComponent from "@/pages/user/components/follow-button/follow-button.component.tsx";
import UserStatsComponent from "@/pages/user/components/user-stats/user-stats.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import styles from "./user-head.module.css";

export default function UserHeadComponent(): ReactNode {
  const { userId } = useParams();

  const { isPending: isVerifyPending, data: currentUser } = useVerifyQuery();

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: user,
  } = useQuery({
    queryKey: ["user", +userId!],
    queryFn: () => getUserApi({ userId }),
  });

  if (isVerifyPending || isUserPending) {
    return <LoadingComponent />;
  }

  if (isUserError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles["user-head"]}>
      <ImageComponent
        className={styles.picture}
        folder="user"
        src={user.picture}
        alt=""
      />
      <TypographyComponent as="h1" variant="h2">
        {user.username}
      </TypographyComponent>
      <UserStatsComponent user={user} />
      {currentUser ? (
        currentUser.id !== user.id && (
          <FollowButtonComponent
            className={styles.button}
            targetUserId={user.id}
            isFollowedByCurrentUser={user.isFollowedByCurrentUser}
          />
        )
      ) : (
        <ButtonComponent className={styles.button} as={Link} to="/sign-in">
          Sign In to Follow
        </ButtonComponent>
      )}
    </div>
  );
}
