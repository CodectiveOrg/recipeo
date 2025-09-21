import { type PropsWithChildren, type ReactNode, use } from "react";

import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "@/api/user/get-user.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";

import { TokenContext } from "@/pages/settings/context/token.context.ts";
import { UserContext } from "@/pages/settings/context/user.context.ts";

type Props = PropsWithChildren;

export default function UserProvider({ children }: Props): ReactNode {
  const { id } = use(TokenContext);

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return <UserContext value={data}>{children}</UserContext>;
}
