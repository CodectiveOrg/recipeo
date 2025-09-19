import { type ReactNode } from "react";

import { Link } from "react-router";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import ButtonComponent from "@/components/button/button.component";
import ImageInputComponent from "@/components/image-input/image-input.component";
import RangeInputLabelComponent from "@/components/range-input/components/label/label.component";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TextAreaComponent from "@/components/text-area/text-area.component";
import TextInputComponent from "@/components/text-input/text-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";
import StepSection from "@/pages/create/sections/steps/step.section.tsx";
import TagsSection from "@/pages/create/sections/tags/tags.section";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function RecipeFormComponent({
  defaultValues,
}: Props): ReactNode {
  return (
    <form className={styles["recipe-form"]}>
      <ImageInputComponent />
      <div className={styles.section}>
        <TypographyComponent as="span" variant="h2">
          Food Name
        </TypographyComponent>
        <TextInputComponent name="Food Name" placeholder="Enter food name" />
      </div>
      <div className={styles.section}>
        <TypographyComponent as="span" variant="h2">
          Description
        </TypographyComponent>
        <TextAreaComponent placeholder="Tell a little about your food" />
      </div>
      <RangeInputComponent
        label={<RangeInputLabelComponent />}
        min={10}
        max={60}
        watchedValue={10}
      />
      <IngredientsSection defaultValues={defaultValues} />
      <hr />
      <StepSection defaultValues={defaultValues} />
      <hr />
      <TagsSection defaultValues={defaultValues} />
      <div className={styles.buttons}>
        <ButtonComponent as={Link} to="/" color="secondary" size="medium">
          Back
        </ButtonComponent>
        <ButtonComponent
          as={Link}
          to="/Upload-success"
          color="primary"
          size="medium"
        >
          Next
        </ButtonComponent>
      </div>
    </form>
  );
}
