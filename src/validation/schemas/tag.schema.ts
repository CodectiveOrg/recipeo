import { z } from "zod";

import { RecipeTitleSchema } from "@/validation/schemas/recipe-fields.schema.ts";

export const TagSchema = z.object({
  title: RecipeTitleSchema,
});

export type TagType = z.infer<typeof TagSchema>;

export const TagArraySchema = z.array(TagSchema).superRefine((tags, ctx) => {
  const traversedTitles = new Set<string>();

  tags.forEach((tag, index) => {
    if (traversedTitles.has(tag.title)) {
      ctx.addIssue({
        code: "custom",
        path: [index, "title"],
        message: "The same tag cannot be used more than once.",
      });
    } else {
      traversedTitles.add(tag.title);
    }
  });
});
