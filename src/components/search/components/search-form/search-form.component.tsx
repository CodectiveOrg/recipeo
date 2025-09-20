import { type PropsWithChildren, type ReactNode, type RefObject } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useSearchHistoryStore } from "@/stores/search-history.store.ts";
import { SearchFiltersSchema } from "@/validation/schemas/search-filters.schema.ts";

import type { SearchFormValuesType } from "@/components/search/types/search-form-values.type.ts";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./search-form.module.css";

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

  const methods = useForm<SearchFormValuesType>({
    values: params,
    resolver: zodResolver(SearchFiltersSchema),
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (
    values: SearchFormValuesType,
  ): Promise<void> => {
    await setParams(values);
    addSearchHistoryItem(values);
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
