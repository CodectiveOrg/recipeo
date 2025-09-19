import { type Context, type ReactNode, useState } from "react";

import type { RecipeType } from "@/validation/schemas/recipe.schema";
import type { TagType } from "@/validation/schemas/tag.schema";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { TagsContext } from "@/pages/create/context/tags.context";
import { generateTag } from "@/pages/create/data/data-generator";
import BaseSection from "@/pages/create/sections/base/base.section";
import MarkInputComponent from "@/pages/create/sections/tags/components/mark-input/mark-input.component";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function TagsSection({ defaultValues }: Props): ReactNode {
  const [tags, setTags] = useState<TagType[]>(() => {
    return defaultValues?.tags ?? [generateTag()];
  });

  return (
    <SectionContext
      value={{
        context: TagsContext as unknown as Context<BaseContextValue<BaseItem>>,
      }}
    >
      <TagsContext
        value={{
          layout: "simple",
          name: "Tag",
          items: tags,
          setItems: setTags,
          generate: generateTag,
          Component: MarkInputComponent,
        }}
      >
        <BaseSection />
      </TagsContext>
    </SectionContext>
  );
}
