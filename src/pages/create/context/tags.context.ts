import type { TagType } from "@/validation/schemas/recipe/tag.schema.ts";

import {
  type BaseItem,
  createBaseContext,
} from "@/pages/create/context/base.context.ts";

export const TagsContext = createBaseContext<BaseItem & TagType>();
