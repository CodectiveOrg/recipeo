import type { ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component";
import TabsComponent, { type Tab } from "@/components/tabs/tabs.component";

import UserHeadComponent from "@/pages/user/components/user-head/user-head.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import LikedTabComponent from "./components/liked-tab/liked-tab.component";
import RecipesTabComponent from "./components/recipes-tab/recipes-tab.component";
import ShareButtonComponent from "./components/share-button/share-button.component";

import styles from "./user.module.css";

export default function UserPage(): ReactNode {
  const { data: currentUser } = useVerifyQuery();

  const tabs: Tab[] = [{ label: "Recipes", content: <RecipesTabComponent /> }];

  if (currentUser) {
    tabs.push({ label: "Liked", content: <LikedTabComponent /> });
  }

  return (
    <div className={styles.user}>
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
