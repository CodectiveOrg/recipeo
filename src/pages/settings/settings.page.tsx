import { type ReactNode } from "react";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import SignOutButtonComponent from "@/pages/settings/components/sign-out-button/sign-out-button.component.tsx";
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
          <header>
            <BackButtonComponent className={styles["back-button"]} />
            <TypographyComponent variant="h2" className={styles.title}>
              Settings
            </TypographyComponent>
          </header>
          <main>
            <SettingsFormComponent />
            <SignOutButtonComponent />
          </main>
        </div>
      </UserProvider>
    </TokenProvider>
  );
}
