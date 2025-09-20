import type { ReactNode } from "react";

import { useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TypographyComponent from "@/components/typography/typography.component.tsx";

type Props = {
  name: keyof RecipeType;
};

export default function RecipeFormErrorComponent({ name }: Props): ReactNode {
  const {
    formState: { errors },
  } = useFormContext<RecipeType>();

  if (!errors[name]) {
    return null;
  }

  return (
    <TypographyComponent as="span" variant="s" color="text-secondary">
      {errors[name].message}
    </TypographyComponent>
  );
}
