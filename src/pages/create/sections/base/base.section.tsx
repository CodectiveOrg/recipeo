import { type ReactNode, use } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import { SectionContext } from "@/pages/create/context/section.context.ts";
import AddButtonComponent from "@/pages/create/sections/base/components/add-button/add-button.component.tsx";
import SortableInputsComponent from "@/pages/create/sections/base/components/sortable-inputs/sortable-inputs.component.tsx";
import BaseDndProvider from "@/pages/create/sections/base/providers/base-dnd-provider.tsx";

import styles from "./base.module.css";

export default function BaseSection(): ReactNode {
  const { context } = use(SectionContext);
  const { label } = use(context);

  return (
    <div className={styles.base}>
      <TypographyComponent as="h2" variant="h2">
        {label}
      </TypographyComponent>
      <BaseDndProvider>
        <SortableInputsComponent />
      </BaseDndProvider>
      <AddButtonComponent />
    </div>
  );
}
