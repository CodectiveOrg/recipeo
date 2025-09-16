import type { ReactNode } from "react";

import TabsComponent from "@/components/tabs/tabs.component";

import UserHeadComponent from "@/pages/user/components/user-head/user-head.component.tsx";

import BackButtonComponent from "./components/back-button/back-button.component";
import LikedTabComponent from "./components/liked-tab/liked-tab.component";
import RecipesTabComponent from "./components/recipes-tab/recipes-tab.component";
import ShareButtonComponent from "./components/share-button/share-button.component";

import styles from "./user.module.css";

export default function UserPage(): ReactNode {
  return (
    <div className={styles.user}>
      <header>
        <BackButtonComponent />
        <ShareButtonComponent />
      </header>
      <main>
        <UserHeadComponent />
        <hr />
        <TabsComponent
          tabs={[
            {
              label: "Recipes",
              content: <RecipesTabComponent />,
            },
            {
              label: "Liked",
              content: <LikedTabComponent />,
            },
          ]}
        />
      </main>
    </div>
  );
}
