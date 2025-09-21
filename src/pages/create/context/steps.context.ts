import type { StepType } from "@/validation/schemas/recipe/step.schema.ts";

import {
  type BaseItem,
  createBaseContext,
} from "@/pages/create/context/base.context.ts";

export const StepsContext = createBaseContext<BaseItem & StepType>();
