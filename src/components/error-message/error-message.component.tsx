import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

type Props = {
  className?: string;
  message: string | undefined;
};

export default function ErrorMessageComponent({
  className,
  message,
}: Props): ReactNode {
  if (!message) {
    return null;
  }

  return (
    <TypographyComponent
      as="span"
      className={className}
      variant="s"
      color="danger"
    >
      {message}
    </TypographyComponent>
  );
}
