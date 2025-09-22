import type { PropsWithChildren, ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";

import { DataContext } from "@/pages/create/context/data.context.ts";

import { tagKeys } from "@/queries/keys.ts";

type Props = PropsWithChildren;

export default function DataProvider({ children }: Props): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: tagKeys.all,
    queryFn: getAllTagsApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return <DataContext value={{ allTags: data }}>{children}</DataContext>;
}
