import { type Context, type ReactNode } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { StepsContext } from "@/pages/create/context/steps.context.ts";
import { generateStep } from "@/pages/create/data/data-generator.ts";
import BaseSection from "@/pages/create/sections/base/base.section.tsx";
import { StepInputComponent } from "@/pages/create/sections/steps/components/step-input/step-input.component.tsx";

export default function StepSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const fieldArray = useFieldArray<RecipeType>({
    control,
    name: "steps",
  });

  return (
    <SectionContext
      value={{
        context: StepsContext as unknown as Context<BaseContextValue<BaseItem>>,
      }}
    >
      <StepsContext
        value={{
          layout: "complex",
          name: "steps",
          label: "Step",
          generate: generateStep,
          Component: StepInputComponent,
          fieldArray,
        }}
      >
        <BaseSection />
      </StepsContext>
    </SectionContext>
  );
}
