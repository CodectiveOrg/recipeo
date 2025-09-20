import { type ChangeEvent, type ReactNode, useRef } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { updateUserApi } from "@/api/user/update-user.api";

import ImageComponent from "@/components/image/image.component";

import styles from "./picture-picker.module.css";

type Props = {
  picture: string | null;
  className?: string;
};

export default function PicturePickerComponent({
  picture,
  className,
}: Props): ReactNode {
  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["edit-picture"],
    mutationFn: updateUserApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["verify"] }),
        queryClient.invalidateQueries({ queryKey: ["user"] }),
      ]);

      toast.success(result.message);
    },
  });

  const inputChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!formRef.current || !e.currentTarget.files) {
      return;
    }

    const formData = new FormData(formRef.current);
    await mutation.mutateAsync({ file: formData });
  };

  return (
    <form ref={formRef} className={clsx(styles["picture-picker"], className)}>
      <ImageComponent folder="user" src={picture} alt="" />
      <label>
        <span className={styles.icon}>+</span>
        <input
          type="file"
          name="picture"
          accept="image/png, image/jpeg"
          onChange={inputChangeHandler}
        />
      </label>
    </form>
  );
}
