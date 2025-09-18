import { z } from "zod";

export const StepSchema = z.object({
  id: z.uuid(),
  description: z.string().trim().nonempty(),
  picture: z.union([z.string(), z.file().nullable()]),
});

export type StepType = z.infer<typeof StepSchema>;
