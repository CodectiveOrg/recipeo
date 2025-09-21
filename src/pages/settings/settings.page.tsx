import { type ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import TokenProvider from "@/pages/settings/providers/token.provider.tsx";
import UserProvider from "@/pages/settings/providers/user.provider.tsx";

import SettingsFormComponent from "./components/settings-form/settings-form.components.tsx";

import styles from "./settings.module.css";

export default function SettingsPage(): ReactNode {
  return (
    <TokenProvider>
      <UserProvider>
        <div className={styles.settings}>
          <TitleComponent>Settings</TitleComponent>
          <HeaderWithBackButtonComponent />
          <main>
            <SettingsFormComponent />
          </main>
        </div>
      </UserProvider>
    </TokenProvider>
  );
}
