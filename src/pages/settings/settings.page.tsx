import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { signOutApi } from "@/api/auth/sign-out.api.ts";
import { getUserApi } from "@/api/user/get-user.api.ts";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import ButtonComponent from "@/components/button/button.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import SettingsFormComponent from "./components/settings-form/settings-form.components.tsx";
import SettingsHeadComponent from "./components/settings-head/settings-head.components.tsx";

import styles from "./settings.module.css";

export default function SettingsPage(): ReactNode {
  const { isPending: isVerifyPending, data: currentUser } = useVerifyQuery();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOutApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["verify"] });

      toast.success(result.message);

      navigate("/sign-in", { replace: true });
    },
  });

  const handleSignOutButtonClick = async (): Promise<void> => {
    await mutation.mutateAsync();
  };

  const userId = `${currentUser?.id}`;

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: user,
  } = useQuery({
    queryKey: ["user", currentUser?.id],
    queryFn: () => getUserApi({ userId }),
  });

  if (isVerifyPending || isUserPending) {
    return <LoadingComponent />;
  }

  if (isUserError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.settings}>
      <TitleComponent>Settins</TitleComponent>
      <header>
        <BackButtonComponent className={styles["back-button"]} />
        <TypographyComponent variant="h2" className={styles.title}>
          Settings
        </TypographyComponent>
      </header>
      <main>
        <SettingsHeadComponent className={styles.section} user={user} />
        <SettingsFormComponent className={styles.form} user={user} />
        <ButtonComponent color="danger" onClick={handleSignOutButtonClick}>
          Sign out
        </ButtonComponent>
      </main>
    </div>
  );
}
