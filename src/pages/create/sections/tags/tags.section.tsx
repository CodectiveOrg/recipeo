import { type Context, type ReactNode } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

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
  const { control } = useFormContext<RecipeType>();
  const fieldArray = useFieldArray<RecipeType>({
    control,
    name: "tags",
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
          name: "tags",
          label: "Tag",
          generate: generateTag,
          Component: TagInputComponent,
          fieldArray,
        }}
      >
        <BaseSection />
      </TagsContext>
    </SectionContext>
  );
}
