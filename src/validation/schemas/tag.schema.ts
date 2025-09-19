import { z } from "zod";

export const TagSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().nonempty(),
});

export type TagType = z.infer<typeof TagSchema>;
