import type { ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component";
import TabsComponent, { type Tab } from "@/components/tabs/tabs.component";
import TitleComponent from "@/components/title/title.component.tsx";

import LikedTabComponent from "@/pages/user/components/liked-tab/liked-tab.component.tsx";
import RecipesTabComponent from "@/pages/user/components/recipes-tab/recipes-tab.component.tsx";
import ShareButtonComponent from "@/pages/user/components/share-button/share-button.component.tsx";
import UserHeadComponent from "@/pages/user/components/user-head/user-head.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import styles from "./user.module.css";

export default function UserPage(): ReactNode {
  const { data: currentUser } = useVerifyQuery();

  const tabs: Tab[] = [{ label: "Recipes", content: <RecipesTabComponent /> }];

  if (currentUser) {
    tabs.push({ label: "Liked", content: <LikedTabComponent /> });
  }

  return (
    <div className={styles.user}>
      <TitleComponent>{currentUser?.username ?? "Profile"}</TitleComponent>
      <header>
        <BackButtonComponent />
        <ShareButtonComponent />
      </header>
      <main>
        <UserHeadComponent />
        <hr />
        <TabsComponent tabs={tabs} />
      </main>
    </div>
  );
}
