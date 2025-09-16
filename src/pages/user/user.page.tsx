import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "@/api/user/get-user.api.ts";

import ImageComponent from "@/components/image/image.component";
import LoadingComponent from "@/components/loading/loading.component";
import TabsComponent from "@/components/tabs/tabs.component";
import TypographyComponent from "@/components/typography/typography.component";

import useVerifyQuery from "@/queries/use-verify.query";

import BackButtonComponent from "./components/back-button/back-button.component";
import FollowButtonComponent from "./components/follow-button/follow-button.component";
import LikedTabComponent from "./components/liked-tab/liked-tab.component";
import RecipesTabComponent from "./components/recipes-tab/recipes-tab.component";
import ShareButtonComponent from "./components/share-button/share-button.component";

import styles from "./user.module.css";

export default function UserPage(): ReactNode {
  const { userId } = useParams();

  const { isPending, isError, data: currentUser } = useVerifyQuery();

  const {
    isPending: userPending,
    isError: userError,
    data: user,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => getUserApi({ userId }),
  });

  if (isPending || userPending) {
    return <LoadingComponent />;
  }

  if (isError || userError) {
    return <div>Error</div>;
  }

  const stats = [
    { count: user.recipesCount, label: "Recipes" },
    { count: user.followingCount, label: "Following" },
    { count: user.followersCount, label: "Followers" },
  ];

  const tabs = [
    {
      label: "Recipes",
      content: <RecipesTabComponent userId={user.id} />,
    },
    { label: "Liked", content: <LikedTabComponent userId={user.id} /> },
  ];

  return (
    <div className={styles.user}>
      <header></header>
      <main>
        <div className={styles.header}>
          <BackButtonComponent />
          <ShareButtonComponent />
        </div>
        <div className={styles.status}>
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
                <TypographyComponent
                  as="span"
                  variant="s"
                  color="text-secondary"
                >
                  {label}
                </TypographyComponent>
              </div>
            ))}
          </div>
          {currentUser.id !== user.id && (
            <FollowButtonComponent userId={user.id} className={styles.button} />
          )}
        </div>
        <hr />
        <TabsComponent tabs={tabs} />
      </main>
    </div>
  );
}
