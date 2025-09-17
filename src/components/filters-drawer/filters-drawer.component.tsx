import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useRef,
} from "react";

import { parseAsInteger, useQueryState } from "nuqs";

import ButtonComponent from "@/components/button/button.component";
import DrawerComponent from "@/components/drawer/drawer.component.tsx";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TagInputComponent from "@/components/tag-input/tag-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref"> & {};

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const [duration, setDuration] = useQueryState<number>(
    "duration",
    parseAsInteger.withDefault(30),
  );

  const [tag, setTag] = useQueryState<string>("tag", {
    parse: (value: string) => value,
  });

  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancelButton = (): void => {
    ref.current?.close();
  };

  let inputedTag = "";

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!rangeInputRef.current) {
      return;
    }

    setDuration(parseInt(rangeInputRef.current?.value));
    setTag(inputedTag);

    ref.current?.close();
  };

  const rangeInputLabel = (
    <div className={styles.label}>
      <TypographyComponent as="span" variant="h2">
        Cooking Duration
      </TypographyComponent>
      <TypographyComponent as="span" variant="p1" color="text-secondary">
        (in minutes)
      </TypographyComponent>
    </div>
  );

  return (
    <DrawerComponent ref={ref} contentClassName={styles.content}>
      <header>
        <TypographyComponent variant="h2" color="text">
          Add a filter
        </TypographyComponent>
      </header>
      <form onSubmit={handleSubmitForm}>
        <TagInputComponent
          label="Tag"
          onChange={(value) => {
            inputedTag = value;
          }}
        />
        <RangeInputComponent
          ref={rangeInputRef}
          label={rangeInputLabel}
          min={10}
          max={60}
        />
        <div className={styles.actions}>
          <ButtonComponent
            type="reset"
            color="secondary"
            onClick={handleCancelButton}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent type="submit">Done</ButtonComponent>
        </div>
      </form>
    </DrawerComponent>
  );
}
