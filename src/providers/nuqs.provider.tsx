import type { PropsWithChildren, ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/react";

type Props = PropsWithChildren;

export default function NuqsProvider({ children }: Props): ReactNode {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
