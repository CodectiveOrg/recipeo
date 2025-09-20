import type { PropsWithChildren, ReactNode, RefObject } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchHistoryStore } from "@/stores/search-history.store.ts";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./search-form.module.css";

const FiltersSchema = z.object({
  query: z.coerce.string<string>(),
  tag: z.coerce.string<string>(),
  maxDuration: z.coerce.number<number>(),
});

type Values = z.infer<typeof FiltersSchema>;

type Props = PropsWithChildren<{
  formDrawerRef: RefObject<HTMLDialogElement | null>;
}>;

export default function SearchFormComponent({
  formDrawerRef,
  children,
}: Props): ReactNode {
  const addSearchHistoryItem = useSearchHistoryStore(
    (state) => state.addSearchHistoryItem,
  );

  const [params, setParams] = useFilterParams();

  const methods = useForm<Values>({
    values: params,
    resolver: zodResolver(FiltersSchema),
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (values: Values): Promise<void> => {
    await setParams(values);
    addSearchHistoryItem({ query: values.query });
    formDrawerRef.current?.close();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles["search-form"]}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
