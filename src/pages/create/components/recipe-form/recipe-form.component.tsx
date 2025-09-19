import { type ReactNode, useRef } from "react";

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
import SuccessModalComponent from "@/components/success-modal/success-modal.component";
import TextAreaComponent from "@/components/text-area/text-area.component";
import TextInputComponent from "@/components/text-input/text-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { RecipeRequestDto } from "@/dto/request/resipe.request.dto";

import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";
import StepSection from "@/pages/create/sections/steps/step.section.tsx";
import TagsSection from "@/pages/create/sections/tags/tags.section";

import ToBase64 from "@/utils/toBase64.utils";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function RecipeFormComponent({
  defaultValues,
}: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (): void => {
    modalRef.current?.showModal();
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RecipeType>({
    defaultValues: {
      ...defaultValues,
      duration: 35,
      ingredients: defaultValues?.ingredients ?? [],
      steps: defaultValues?.steps ?? [],
      tags: defaultValues?.tags ?? [],
    },
    resolver: zodResolver(RecipeSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  console.log("isValid", isValid);

  const { mutateAsync } = useMutation({
    mutationKey: ["recipe", "create"],
    mutationFn: postRecipeApi,
  });

  const onSubmit = async (data: RecipeType): Promise<void> => {
    const pictureStr = await ToBase64(data.picture);
    const dto: RecipeRequestDto = {
      ...data,
      picture: pictureStr,
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
      onSuccess: (): void => {
        console.log("dto", dto);
        openModal();
      },
      onError: (error): void => {
        console.log("error", error);
        toast.error(error.message);
      },
    });
  };
  const onError = (errors: unknown): void => {
    console.log("Validation Errors:", errors);
  };
  console.log("Errors", errors, Object.keys(errors).length);

  return (
    <form
      className={styles["recipe-form"]}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={styles.section}>
        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <ImageInputComponent onChange={(file) => field.onChange(file)} />
          )}
        />
        {errors.picture && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.picture.message}
          </TypographyComponent>
        )}
      </div>
      <div className={styles.section}>
        <TypographyComponent as="h2" variant="h2">
          Food Name
        </TypographyComponent>
        <TextInputComponent
          state={errors.title ? "error" : "success"}
          placeholder="Enter food name"
          {...register("title")}
        />
        {errors.title && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.title.message}
          </TypographyComponent>
        )}
      </div>
      <div className={styles.section}>
        <TypographyComponent as="h2" variant="h2">
          Description
        </TypographyComponent>
        <TextAreaComponent
          placeholder="Tell a little about your food"
          {...register("description")}
        />
        {errors.description && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.description.message}
          </TypographyComponent>
        )}
      </div>
      <div className={styles.section}>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <RangeInputComponent
              label={<RangeInputLabelComponent />}
              min={10}
              max={60}
              watchedValue={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.duration && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.duration.message}
          </TypographyComponent>
        )}
      </div>
      <div className={styles.section}>
        <IngredientsSection
          defaultValues={defaultValues}
          {...register("ingredients")}
        />
        {errors.ingredients && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.ingredients.message}
          </TypographyComponent>
        )}
      </div>
      <hr />
      <div className={styles.section}>
        <StepSection defaultValues={defaultValues} {...register("steps")} />
        {errors.steps && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.steps.message}
          </TypographyComponent>
        )}
      </div>
      <hr />
      <div className={styles.section}>
        <TagsSection defaultValues={defaultValues} {...register("tags")} />
        {errors.tags && (
          <TypographyComponent as="span" variant="s" color="text-secondary">
            {errors.tags.message}
          </TypographyComponent>
        )}
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
          {isSubmitting ? "Submitting..." : "Next"}
        </ButtonComponent>
      </div>
      <SuccessModalComponent ref={modalRef} />
    </form>
  );
}
