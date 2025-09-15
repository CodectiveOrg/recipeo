import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { UserProfileApi } from "@/api/user/user-profile.api";

import ButtonComponent from "@/components/button/button.component";
import ImageComponent from "@/components/image/image.component";
import LoadingComponent from "@/components/loading/loading.component";
import TabsComponent from "@/components/tabs/tabs.component";
import TypographyComponent from "@/components/typography/typography.component";

import useVerifyQuery from "@/queries/use-verify.query";

import BackButtonComponent from "./components/back-button/back-button.component";
import LikedTabComponent from "./components/liked-tab/liked-tab.component";
import RecipesTabComponent from "./components/recipes-tab/recipes-tab.component";
import ShareButtonComponent from "./components/share-button/share-button.component";

import styles from "./profile.module.css";

export default function ProfilePage(): ReactNode {
  const { profileId } = useParams();

  const { isPending, isError, data: verifyId } = useVerifyQuery();

  const finalyId = Number(profileId) || verifyId?.id;

  const {
    isPending: userPending,
    isError: userError,
    data: user,
  } = useQuery({
    queryKey: ["user", "profile", finalyId],
    queryFn: async () => UserProfileApi({ profileId: finalyId }),
  });

  const stats = [
    { count: user?.recipesCount, label: "Recipes" },
    { count: user?.followingCount, label: "Following" },
    { count: user?.followersCount, label: "Followers" },
  ];

  const tabs = [
    {
      label: "Recipes",
      content: <RecipesTabComponent profileId={finalyId} />,
    },
    { label: "Liked", content: <LikedTabComponent profileId={finalyId} /> },
  ];

  if (isPending || userPending) {
    return <LoadingComponent />;
  }

  if (isError || userError) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.profile}>
      <header />
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
            className={styles.profile}
          />
          <TypographyComponent as="h2" variant="h2">
            {user.username}
          </TypographyComponent>
          <div className={styles.stats}>
            {stats.map(({ count, label }) => (
              <div key={label} className={styles.stat}>
                <TypographyComponent as="h2" variant="h2">
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
          {verifyId.id !== user.id && (
            <ButtonComponent size="medium" className={styles.button}>
              Follow
            </ButtonComponent>
          )}
        </div>
        <hr />
        <TabsComponent tabs={tabs} />
      </main>
    </div>
  );
}
