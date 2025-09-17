import { type Context, type ReactNode, useState } from "react";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";
import type { StepType } from "@/validation/schemas/step.schema.ts";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { StepsContext } from "@/pages/create/context/steps.context.ts";
import { generateStep } from "@/pages/create/data/data-generator.ts";
import BaseSection from "@/pages/create/sections/base/base.section.tsx";
import StepInputComponent from "@/pages/create/sections/steps/components/step-input/step-input.component.tsx";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function StepSection({ defaultValues }: Props): ReactNode {
  const [steps, setSteps] = useState<StepType[]>(() => {
    return defaultValues?.steps ?? [generateStep()];
  });

  return (
    <SectionContext
      value={{
        context: StepsContext as unknown as Context<BaseContextValue<BaseItem>>,
      }}
    >
      <StepsContext
        value={{
          name: "Step",
          items: steps,
          setItems: setSteps,
          generate: generateStep,
          Component: StepInputComponent,
        }}
      >
        <BaseSection />
      </StepsContext>
    </SectionContext>
  );
}
