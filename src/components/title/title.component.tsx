import type { ReactNode } from "react";

type Props = {
  children: string;
};

export default function TitleComponent({
  children,
  ...otherProps
}: Props): ReactNode {
  return <title {...otherProps}>{children + " | Recipeo"}</title>;
}
