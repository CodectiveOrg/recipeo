import { type Context, type ReactNode, useState } from "react";

import type { IngredientType } from "@/validation/schemas/ingredient.schema.ts";
import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { generateIngredient } from "@/pages/create/data/data-generator.ts";
import BaseSection from "@/pages/create/sections/base/base.section.tsx";
import IngredientInputComponent from "@/pages/create/sections/ingredients/components/ingredient-input/ingredient-input.component.tsx";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function IngredientsSection({
  defaultValues,
}: Props): ReactNode {
  const [ingredients, setIngredients] = useState<IngredientType[]>(() => {
    return defaultValues?.ingredients ?? [generateIngredient()];
  });

  return (
    <SectionContext
      value={{
        context: IngredientsContext as unknown as Context<
          BaseContextValue<BaseItem>
        >,
      }}
    >
      <IngredientsContext
        value={{
          layout: "simple",
          name: "Ingredient",
          items: ingredients,
          setItems: setIngredients,
          generate: generateIngredient,
          Component: IngredientInputComponent,
        }}
      >
        <BaseSection />
      </IngredientsContext>
    </SectionContext>
  );
}
