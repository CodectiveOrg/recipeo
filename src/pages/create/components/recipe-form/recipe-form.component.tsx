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
    formState: { isSubmitting },
  } = useForm<RecipeType>({
    defaultValues,
    resolver: zodResolver(RecipeSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["recipe", "create"],
    mutationFn: postRecipeApi,
  });

  const onSubmit = async (data: RecipeType): Promise<void> => {
    console.log("data", data);
    // await mutateAsync(data, {
    //   onSuccess: (data): void => {
    //     toast.success(data.message);
    //     // navigate("/") //RecipeRequestDto;
    //   },
    //   onError: (error): void => {
    //     toast.error(error.message);
    //   },
    // });
  };

  return (
    <form className={styles["recipe-form"]} onSubmit={handleSubmit(onSubmit)}>
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
      <StepSection defaultValues={defaultValues} />
      <hr />
      <TagsSection defaultValues={defaultValues} />
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
    </form>
  );
}
