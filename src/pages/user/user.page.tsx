import type { ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import TabsComponent, { type Tab } from "@/components/tabs/tabs.component";

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
      <HeaderWithBackButtonComponent extra={<ShareButtonComponent />} />
      <main>
        <UserHeadComponent />
        <hr />
        <TabsComponent tabs={tabs} />
      </main>
    </div>
  );
}
