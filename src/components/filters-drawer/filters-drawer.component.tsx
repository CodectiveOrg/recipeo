import { type ComponentProps, type ReactNode } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ButtonComponent from "@/components/button/button.component";
import DrawerComponent from "@/components/drawer/drawer.component.tsx";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TagInputComponent from "@/components/tag-input/tag-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

const FiltersSchema = z.object({
  tag: z.coerce.string(),
  maxDuration: z.coerce.number(),
});

type Values = z.infer<typeof FiltersSchema>;

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref">;

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const [tag, setTag] = useQueryState<string>(
    "tag",
    parseAsString.withDefault("all"),
  );

  const [maxDuration, setMaxDuration] = useQueryState<number>(
    "maxDuration",
    parseAsInteger.withDefault(60),
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    values: { tag, maxDuration },
    resolver: zodResolver(FiltersSchema),
  });

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = async (values: Values): Promise<void> => {
    await setTag(values.tag);
    await setMaxDuration(values.maxDuration);

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
          {...register("maxDuration")}
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
