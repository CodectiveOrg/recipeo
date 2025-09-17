import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().nonempty(),
});

export const IngredientsSchema = z.array(IngredientSchema);

export type IngredientType = z.infer<typeof IngredientSchema>;
