import { z } from "zod";

export const StepSchema = z.object({
  description: z
    .string("Description must be a string.")
    .trim()
    .nonempty("Description cannot be empty."),
  picture: z.union([z.string(), z.file().nullable()]),
});

export type StepType = z.infer<typeof StepSchema>;
