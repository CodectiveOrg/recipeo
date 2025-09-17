import type { ReactNode } from "react";

import { Link, useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "@/api/user/get-user.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import ImageComponent from "@/components/image/image.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import FollowButtonComponent from "@/pages/user/components/follow-button/follow-button.component.tsx";

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
    queryFn: async () => getUserApi({ userId }),
  });

  if (isVerifyPending || isUserPending) {
    return <LoadingComponent />;
  }

  if (isUserError) {
    return <div>Error</div>;
  }

  const stats = [
    { count: user.recipesCount, label: "Recipes" },
    { count: user.followingCount, label: "Following" },
    { count: user.followersCount, label: "Followers" },
  ];

  return (
    <div className={styles["user-head"]}>
      <ImageComponent
        folder="user"
        src={user.picture}
        alt=""
        className={styles.user}
      />
      <TypographyComponent as="h2" variant="h2">
        {user.username}
      </TypographyComponent>
      <div className={styles.stats}>
        {stats.map(({ count, label }) => (
          <div key={label} className={styles.stat}>
            <TypographyComponent as="div" variant="h2">
              {count}
            </TypographyComponent>
            <TypographyComponent as="span" variant="s" color="text-secondary">
              {label}
            </TypographyComponent>
          </div>
        ))}
      </div>
      {currentUser ? (
        currentUser.id !== user.id && (
          <FollowButtonComponent
            className={styles.button}
            targetUserId={user.id}
            isFollowedByCurrentUser={user.isFollowedByCurrentUser}
          />
        )
      ) : (
        <ButtonComponent as={Link} to="/sign-in">
          Sign In to Follow
        </ButtonComponent>
      )}
    </div>
  );
}
