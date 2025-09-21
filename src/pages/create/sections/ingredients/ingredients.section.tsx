import { type Context, type ReactNode } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { generateIngredient } from "@/pages/create/data/data-generator.ts";
import BaseSection from "@/pages/create/sections/base/base.section.tsx";
import IngredientInputComponent from "@/pages/create/sections/ingredients/components/ingredient-input/ingredient-input.component.tsx";

export default function IngredientsSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const fieldArray = useFieldArray<RecipeType>({
    control,
    name: "ingredients",
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
          name: "ingredients",
          label: "Ingredient",
          generate: generateIngredient,
          Component: IngredientInputComponent,
          fieldArray,
        }}
      >
        <BaseSection />
      </IngredientsContext>
    </SectionContext>
  );
}
