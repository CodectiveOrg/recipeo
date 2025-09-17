import { z } from "zod";

export const StepSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().nonempty(),
});

export type StepType = z.infer<typeof StepSchema>;
