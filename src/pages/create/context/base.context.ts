import {
  type Context,
  type Dispatch,
  type JSXElementConstructor,
  type SetStateAction,
  createContext,
} from "react";

export type BaseItem = { id: string };

export type BaseComponent<T extends BaseItem> = JSXElementConstructor<{
  presentational?: boolean;
  item: T;
  setItems: Dispatch<SetStateAction<T[]>>;
}>;

export type BaseContextValue<T extends BaseItem> = {
  layout: "simple" | "complex";
  name: string;
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  generate: () => T;
  Component: BaseComponent<T>;
};

export function createBaseContext<T extends BaseItem>(): Context<
  BaseContextValue<T>
> {
  return createContext<BaseContextValue<T>>({} as BaseContextValue<T>);
}
