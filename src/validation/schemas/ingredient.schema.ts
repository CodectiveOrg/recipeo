import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().nonempty(),
});

export type IngredientType = z.infer<typeof IngredientSchema>;
