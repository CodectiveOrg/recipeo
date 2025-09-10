import {
  type ChangeEvent,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./image-input.module.css";

const MAX_SIZE_MEGABYTE = 1;
const MAX_SIZE_BYTE = MAX_SIZE_MEGABYTE * 1024 * 1024;

type Props = Omit<ComponentProps<"input">, "ref" | "accept" | "onChange"> & {
  ref?: RefObject<HTMLInputElement | null>;
  accept?: `image/${string}`;
  previouslyUploadedPicture?: string;
  onChange?: (file: File | null) => void;
};

export default function ImageInputComponent({
  ref,
  className,
  previouslyUploadedPicture,
  onChange,
  ...otherProps
}: Props): ReactNode {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const localRef = useRef<HTMLInputElement | null>(null);
  const finalRef = ref ?? localRef;

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
    if (finalRef.current) {
      finalRef.current.value = "";
    }

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
      <IconComponent name="gallery-bold" />
      <TypographyComponent variant="p2" color="text">
        Add Cover Photo
      </TypographyComponent>
      <TypographyComponent variant="s" color="text-secondary">
        (up to {MAX_SIZE_MEGABYTE} MB)
      </TypographyComponent>
    </div>
  );

  const previewContent = (
    <div className={styles.preview}>
      {/* TODO: User ImageComponent. */}
      <img src={previouslyUploadedPicture ?? previewUrl ?? ""} alt="" />
      <IconButtonComponent onClick={handleRemoveButtonClick}>
        <IconComponent name="close-circle-bold" />
      </IconButtonComponent>
    </div>
  );

  return (
    <label className={clsx(styles["upload-image"], className)}>
      <input
        ref={finalRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        {...otherProps}
      />
      {isBlank ? blankContent : previewContent}
    </label>
  );
}
