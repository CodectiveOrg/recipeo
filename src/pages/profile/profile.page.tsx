import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { UserProfileApi } from "@/api/user/user-profile.api";

import ImageComponent from "@/components/image/image.component";
import TabsComponent from "@/components/tabs/tabs.component";
import TypographyComponent from "@/components/typography/typography.component";

import BackButtonComponent from "./components/back-button/back-button.component";
import RecipesTabComponent from "./components/recipes-tab/recipes-tab.component";
import ShareButtonComponent from "./components/share-button/share-button.component";

import styles from "./profile.module.css";

export default function ProfilePage(): ReactNode {
  const { profileId } = useParams();

  const { data: user } = useQuery({
    queryKey: ["user-profile", profileId],
    queryFn: async () => UserProfileApi({ profileId: profileId! }),
    enabled: !!profileId,
  });

  const stats = [
    { count: user?.recipesCount, label: "Recipes" },
    { count: user?.followingCount, label: "Following" },
    { count: user?.followersCount, label: "Followers" },
  ];

  const tabs = [
    {
      label: "Recipes",
      content: <RecipesTabComponent profileId={profileId!} />,
    },
    { label: "Liked", content: <div>Liked Recipes</div> },
  ];

  if (!user) return null;
  return (
    <div className={styles.profile}>
      <main>
        <div className={styles.header}>
          <BackButtonComponent />
          <ShareButtonComponent />
        </div>
        <div className={styles.status}>
          <ImageComponent
            folder="user"
            src={user.picture}
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
        </div>
        <hr />
        <TabsComponent tabs={tabs} />
      </main>
    </div>
  );
}
