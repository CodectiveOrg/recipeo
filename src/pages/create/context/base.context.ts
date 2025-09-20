import { type Context, type JSXElementConstructor, createContext } from "react";

import type { FieldArrayPath } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

export type BaseItem = { id: string };

export type BaseComponent = JSXElementConstructor<{
  index: number;
}>;

export type BaseContextValue<T extends BaseItem> = {
  layout: "simple" | "complex";
  name: FieldArrayPath<RecipeType>;
  label: string;
  generate: () => T;
  Component: BaseComponent;
};

export function createBaseContext<T extends BaseItem>(): Context<
  BaseContextValue<T>
> {
  return createContext<BaseContextValue<T>>({} as BaseContextValue<T>);
}
