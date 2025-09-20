import { type Context, type ReactNode } from "react";

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
        }}
      >
        <BaseSection />
      </StepsContext>
    </SectionContext>
  );
}
