import {
  type ChangeEvent,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

import TextInputComponent from "@/components/text-input/text-input.component.tsx";

type Props = {
  presentational?: boolean;
  item: IngredientType;
  setItems: Dispatch<SetStateAction<IngredientType[]>>;
};

export default function IngredientInputComponent({
  item,
  setItems,
}: Props): ReactNode {
  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setItems((old) =>
      old.map((x) => {
        if (x.id !== item.id) {
          return x;
        }

        return { ...x, title: e.target.value };
      }),
    );
  };

  return (
    <TextInputComponent
      type="text"
      value={item.title}
      onChange={handleTitleInputChange}
      placeholder={`Ingredient...`}
    />
  );
}
