import { type ReactNode } from "react";

import { Link } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  RecipeSchema,
  type RecipeType,
} from "@/validation/schemas/recipe.schema.ts";

import { createRecipeApi } from "@/api/recipe/create-recipe.api.ts";

import ButtonComponent from "@/components/button/button.component";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";
import {
  generateIngredient,
  generateStep,
  generateTag,
} from "@/pages/create/data/data-generator";
import DescriptionSection from "@/pages/create/sections/description/description.section.tsx";
import DurationSection from "@/pages/create/sections/duration/duration.section.tsx";
import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";
import PictureSection from "@/pages/create/sections/picture/picture.section.tsx";
import StepSection from "@/pages/create/sections/steps/step.section.tsx";
import TagsSection from "@/pages/create/sections/tags/tags.section";
import TitleSection from "@/pages/create/sections/title/title.section.tsx";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues?: RecipeType;
  onSubmit?: () => void;
};

export default function RecipeFormComponent({
  defaultValues,
  onSubmit,
}: Props): ReactNode {
  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      title: defaultValues?.title ?? "",
      duration: 35,
      ingredients: defaultValues?.ingredients ?? [generateIngredient()],
      steps: defaultValues?.steps ?? [generateStep()],
      tags: defaultValues?.tags ?? [generateTag()],
    },
    resolver: zodResolver(RecipeSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { mutateAsync } = useMutation({
    mutationKey: ["recipe", "create"],
    mutationFn: createRecipeApi,
    onSuccess: (): void => {
      onSubmit?.();
    },
    onError: (error): void => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = async (data: RecipeType): Promise<void> => {
    await mutateAsync(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles["recipe-form"]}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <PictureSection />
        <TitleSection />
        <DescriptionSection />
        <DurationSection />
        <div className={styles.section}>
          <IngredientsSection
            defaultValues={defaultValues}
            {...register("ingredients")}
          />
          <RecipeFormErrorComponent message={errors.ingredients?.message} />
        </div>
        <hr />
        <div className={styles.section}>
          <StepSection defaultValues={defaultValues} {...register("steps")} />
          <RecipeFormErrorComponent message={errors.steps?.message} />
        </div>
        <hr />
        <div className={styles.section}>
          <TagsSection defaultValues={defaultValues} {...register("tags")} />
          <RecipeFormErrorComponent message={errors.tags?.message} />
        </div>
        <div className={styles.buttons}>
          <ButtonComponent as={Link} to="/" color="secondary" size="medium">
            Cancel
          </ButtonComponent>
          <ButtonComponent
            color="primary"
            size="medium"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </ButtonComponent>
        </div>
      </form>
    </FormProvider>
  );
}
