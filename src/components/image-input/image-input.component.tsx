import {
  type ChangeEvent,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  useState,
} from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component";
import ImageComponent from "@/components/image/image.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import type { PictureFolderType } from "@/types/picture-folder.type.ts";

import styles from "./image-input.module.css";

const MAX_SIZE_MEGABYTE = 1;
const MAX_SIZE_BYTE = MAX_SIZE_MEGABYTE * 1024 * 1024;

type Props = Omit<ComponentProps<"input">, "accept" | "onChange"> & {
  accept?: `image/${string}`;
  layout?: "simple" | "complex" | "profile";
  folder: PictureFolderType;
  previouslyUploadedPicture?: string | null;
  onChange?: (file: File | null) => void;
};

export default function ImageInputComponent({
  className,
  layout = "complex",
  folder,
  previouslyUploadedPicture,
  onChange,
  ...otherProps
}: Props): ReactNode {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updatePreviewUrl = (file: File | null): void => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const validateInput = (e: ChangeEvent<HTMLInputElement>): File | null => {
    const files = e.target.files;
    if (!(files && files.length > 0)) {
      return null;
    }

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image.");
      return null;
    }

    if (file.size > MAX_SIZE_BYTE) {
      toast.error(`The file size should not exceed ${MAX_SIZE_MEGABYTE}MB.`);
      return null;
    }

    return file;
  };

  const remove = (): void => {
    updatePreviewUrl(null);
    onChange?.(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = validateInput(e);

    if (!file) {
      remove();
      return;
    }

    updatePreviewUrl(file);
    onChange?.(file);
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    remove();
  };

  const isBlank = !previouslyUploadedPicture && !previewUrl;

  const blankContent = (
    <div className={styles.blank}>
      <IconComponent name="gallery-bold" color="text-secondary" />
      {layout === "complex" && (
        <TypographyComponent variant="p2" color="text">
          Add Cover Photo
        </TypographyComponent>
      )}
      <TypographyComponent variant="s" color="text-secondary">
        (up to {MAX_SIZE_MEGABYTE} MB)
      </TypographyComponent>
    </div>
  );

  const previewContent = (
    <div className={styles.preview}>
      {previouslyUploadedPicture ? (
        <ImageComponent
          folder={folder}
          src={previouslyUploadedPicture}
          alt=""
        />
      ) : (
        <img src={previewUrl ?? ""} alt="" />
      )}
      <IconComponent className={styles["edit-icon"]} name="gallery-edit-bold" />
      <IconButtonComponent
        className={styles["remove-button"]}
        onClick={handleRemoveButtonClick}
      >
        <IconComponent name="close-circle-bold" />
      </IconButtonComponent>
    </div>
  );

  return (
    <label className={clsx(styles["upload-image"], styles[layout], className)}>
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        {...otherProps}
      />
      {isBlank ? blankContent : previewContent}
    </label>
  );
}
