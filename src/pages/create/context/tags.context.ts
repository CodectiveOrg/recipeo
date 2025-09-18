import type { TagType } from "@/validation/schemas/tag.schema";

import { createBaseContext } from "@/pages/create/context/base.context.ts";

export const TagsContext = createBaseContext<TagType>();
