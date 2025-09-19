import {
  type ChangeEvent,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { TagType } from "@/validation/schemas/tag.schema";

import TagInputComponent from "@/components/tag-input/tag-input.component";

type Props = {
  presentational?: boolean;
  item: TagType;
  setItems: Dispatch<SetStateAction<TagType[]>>;
};

export default function MarkInputComponent({
  item,
  setItems,
}: Props): ReactNode {
  const handleTagInputChange = (e: ChangeEvent<HTMLSelectElement>): void => {
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
    <TagInputComponent
      isLabel={false}
      label={item.title}
      onChange={handleTagInputChange}
    />
  );
}
