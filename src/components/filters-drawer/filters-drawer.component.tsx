import { type ComponentProps, type ReactNode } from "react";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

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
  tag: z.coerce.string<string>(),
  maxDuration: z.coerce.number<number>(),
});

type Values = z.infer<typeof FiltersSchema>;

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref">;

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const [values, setValues] = useQueryStates({
    tag: parseAsString.withDefault("all"),
    maxDuration: parseAsInteger.withDefault(60),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<Values>({
    values,
    resolver: zodResolver(FiltersSchema),
  });

  const watchedMaxDuration = watch("maxDuration");

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = async (values: Values): Promise<void> => {
    await setValues(values);
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
      <TypographyComponent className={styles.title} variant="h2" color="text">
        Add a Filter
      </TypographyComponent>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TagInputComponent label="Tag" {...register("tag")} />
        <RangeInputComponent
          label={rangeInputLabel}
          {...register("maxDuration")}
          min={10}
          max={60}
          watchedValue={watchedMaxDuration}
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
