import type { StepType } from "@/validation/schemas/step.schema.ts";

import { createBaseContext } from "@/pages/create/context/base.context.ts";

export const StepsContext = createBaseContext<StepType>();
