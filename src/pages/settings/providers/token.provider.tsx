import type { PropsWithChildren, ReactNode } from "react";

import LoadingComponent from "@/components/loading/loading.component.tsx";

import { TokenContext } from "@/pages/settings/context/token.context.ts";

import useVerifyQuery from "@/queries/use-verify.query.ts";

type Props = PropsWithChildren;

export default function TokenProvider({ children }: Props): ReactNode {
  const { data, isPending, isError } = useVerifyQuery();

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return <TokenContext value={data}>{children}</TokenContext>;
}
