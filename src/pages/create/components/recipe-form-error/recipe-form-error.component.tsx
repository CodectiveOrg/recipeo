import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

type Props = {
  message: string | undefined;
};

export default function RecipeFormErrorComponent({
  message,
}: Props): ReactNode {
  if (!message) {
    return null;
  }

  return (
    <TypographyComponent as="span" variant="s" color="danger">
      {message}
    </TypographyComponent>
  );
}
