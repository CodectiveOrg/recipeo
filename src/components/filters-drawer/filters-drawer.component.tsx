import { type ComponentProps, type ReactNode } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

import ButtonComponent from "@/components/button/button.component";
import DrawerComponent from "@/components/drawer/drawer.component.tsx";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TagInputComponent from "@/components/tag-input/tag-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

type Values = {
  tag: string;
  duration: number;
};

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref">;

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const [tag, setTag] = useQueryState<string>(
    "tag",
    parseAsString.withDefault("all"),
  );

  const [duration, setDuration] = useQueryState<number>(
    "duration",
    parseAsInteger.withDefault(60),
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Values>({
    defaultValues: { tag, duration },
  });

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = async (values: Values): Promise<void> => {
    await setTag(values.tag);
    await setDuration(values.duration);

    ref.current?.close();
  };

  const rangeInputLabel = (
    <div className={styles.label}>
      <TypographyComponent as="span" variant="h2">
        Max Duration
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TagInputComponent label="Tag" {...register("tag")} />
        <RangeInputComponent
          label={rangeInputLabel}
          {...register("duration")}
          min={10}
          max={60}
        />
        <div className={styles.actions}>
          <ButtonComponent
            type="button"
            color="secondary"
            disabled={isSubmitting}
            onClick={handleCancelButtonClick}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent type="submit" disabled={isSubmitting}>
            Done
          </ButtonComponent>
        </div>
      </form>
    </DrawerComponent>
  );
}
