import { type Context, type ReactNode } from "react";

import type {
  BaseContextValue,
  BaseItem,
} from "@/pages/create/context/base.context.ts";
import { SectionContext } from "@/pages/create/context/section.context.ts";
import { TagsContext } from "@/pages/create/context/tags.context";
import { generateTag } from "@/pages/create/data/data-generator";
import BaseSection from "@/pages/create/sections/base/base.section";
import TagInputComponent from "@/pages/create/sections/tags/components/tag-input/tag-input.component.tsx";

export default function TagsSection(): ReactNode {
  return (
    <SectionContext
      value={{
        context: TagsContext as unknown as Context<BaseContextValue<BaseItem>>,
      }}
    >
      <TagsContext
        value={{
          layout: "simple",
          name: "tags",
          label: "Tag",
          generate: generateTag,
          Component: TagInputComponent,
        }}
      >
        <BaseSection />
      </TagsContext>
    </SectionContext>
  );
}
