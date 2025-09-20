import { type ReactNode } from "react";

import { Link } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";

import {
  RecipeSchema,
  type RecipeType,
} from "@/validation/schemas/recipe.schema.ts";

import { createRecipeApi } from "@/api/recipe/create-recipe.api.ts";

import ButtonComponent from "@/components/button/button.component";
import ImageInputComponent from "@/components/image-input/image-input.component";
import TextAreaComponent from "@/components/text-area/text-area.component";
import TextInputComponent from "@/components/text-input/text-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";
import {
  generateIngredient,
  generateStep,
  generateTag,
} from "@/pages/create/data/data-generator";
import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";
import StepSection from "@/pages/create/sections/steps/step.section.tsx";
import TagsSection from "@/pages/create/sections/tags/tags.section";

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
      duration: 35,
      ingredients: defaultValues?.ingredients ?? [generateIngredient()],
      steps: defaultValues?.steps ?? [generateStep()],
      tags: defaultValues?.tags ?? [generateTag()],
    },
    resolver: zodResolver(RecipeSchema),
  });

  const {
    register,
    control,
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
        <div className={styles.section}>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <ImageInputComponent onChange={(file) => field.onChange(file)} />
            )}
          />
          <RecipeFormErrorComponent message={errors.picture?.message} />
        </div>
        <div className={styles.section}>
          <TypographyComponent as="h2" variant="h2">
            Food Name
          </TypographyComponent>
          <TextInputComponent
            placeholder="Enter food name"
            {...register("title")}
          />
          <RecipeFormErrorComponent message={errors.title?.message} />
        </div>
        <div className={styles.section}>
          <TypographyComponent as="h2" variant="h2">
            Description
          </TypographyComponent>
          <TextAreaComponent
            placeholder="Tell a little about your food"
            {...register("description")}
          />
          <RecipeFormErrorComponent message={errors.description?.message} />
        </div>
        <div className={styles.section}>
          <TypographyComponent as="h2" variant="h2">
            Max Duration
            <TypographyComponent as="span" variant="p1" color="text-secondary">
              (in minutes)
            </TypographyComponent>
          </TypographyComponent>
          <TextInputComponent placeholder="30" {...register("duration")} />
          <RecipeFormErrorComponent message={errors.duration?.message} />
        </div>
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
            Back
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
