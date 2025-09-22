import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "@/api/user/get-user.api.ts";

import ImageComponent from "@/components/image/image.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import UserHeadActionsComponent from "@/pages/user/components/user-head-actions/user-head-actions.component.tsx";
import UserStatsComponent from "@/pages/user/components/user-stats/user-stats.component.tsx";

import { userKeys } from "@/queries/keys.ts";
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
    queryKey: userKeys.detail(+userId!),
    queryFn: () => getUserApi(+userId!),
  });

  if (isVerifyPending || isUserPending) {
    return <LoadingComponent />;
  }

  if (isUserError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles["user-head"]}>
      <TitleComponent>{user.username}</TitleComponent>
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
      <UserHeadActionsComponent currentUser={currentUser} user={user} />
    </div>
  );
}
