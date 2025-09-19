import { type ReactNode } from "react";

import { Link } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  RecipeSchema,
  type RecipeType,
} from "@/validation/schemas/recipe.schema.ts";

import { postRecipeApi } from "@/api/recipe/post-recipe.api";

import ButtonComponent from "@/components/button/button.component";
import ImageInputComponent from "@/components/image-input/image-input.component";
import RangeInputLabelComponent from "@/components/range-input/components/label/label.component";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TextAreaComponent from "@/components/text-area/text-area.component";
import TextInputComponent from "@/components/text-input/text-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { RecipeRequestDto } from "@/dto/request/resipe.request.dto";

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecipeType>({
    defaultValues,
    resolver: zodResolver(RecipeSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["recipe", "create"],
    mutationFn: postRecipeApi,
  });

  const onSubmit = async (data: RecipeType): Promise<void> => {
    const dto: RecipeRequestDto = {
      ...data,
      tags: data.tags.map((tag) => ({
        ...tag,
        id: Number(tag.id),
      })),
      ingredients: data.ingredients.map((ingredient) => ({
        ...ingredient,
        id: Number(ingredient.id),
      })),
      steps: data.steps.map((step) => ({
        ...step,
        id: Number(step.id),
      })),
    };
    await mutateAsync(dto, {
      onSuccess: (data): void => {
        console.log("data", data);
        toast.success(data.message);
        // navigate("/")
      },
      onError: (error): void => {
        console.log("error", error, error.message);

        toast.error(error.message);
      },
    });
  };
  const onError = (errors: unknown): void => {
    console.log("Validation Errors:", errors);
  };

  return (
    <form
      className={styles["recipe-form"]}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <ImageInputComponent
            previouslyUploadedPicture={
              typeof field.value === "string" ? field.value : undefined
            }
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <div className={styles.section}>
        <TypographyComponent as="span" variant="h2">
          Food Name
        </TypographyComponent>
        <TextInputComponent
          placeholder="Enter food name"
          {...register("title")}
        />
      </div>
      <div className={styles.section}>
        <TypographyComponent as="span" variant="h2">
          Description
        </TypographyComponent>
        <TextAreaComponent
          placeholder="Tell a little about your food"
          {...register("description")}
        />
      </div>
      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <RangeInputComponent
            label={<RangeInputLabelComponent />}
            min={10}
            max={60}
            watchedValue={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />
      <IngredientsSection
        defaultValues={defaultValues}
        {...register("ingredients")}
      />
      <hr />
      <StepSection defaultValues={defaultValues} {...register("steps")} />
      <hr />
      <TagsSection defaultValues={defaultValues} {...register("tags")} />
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
          {isSubmitting ? "Submitting..." : "Next"}
        </ButtonComponent>
      </div>
      {errors.title && <span>{errors.title.message}</span>}
      {errors.description && <span>{errors.description.message}</span>}
    </form>
  );
}
