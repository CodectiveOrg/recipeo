import { type ComponentProps, type ReactNode, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { UserFollowApi } from "@/api/user/user-follow.api";
import { UserUnFollowApi } from "@/api/user/user-unfollow.api";

import ButtonComponent from "@/components/button/button.component";

import useVerifyQuery from "@/queries/use-verify.query";

type Props = ComponentProps<"button"> & {
  isInitiallyFollowing: boolean;
  className?: string;
};
export default function FollowButtonComponent({
  isInitiallyFollowing,
  className,
}: Props): ReactNode {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const { data } = useVerifyQuery();

  const { mutateAsync: followMutateAsync } = useMutation({
    mutationKey: ["user", "follow", data],
    mutationFn: () => UserFollowApi({ verifyId: data! }),
  });

  const { mutateAsync: unfollowMutateAsync } = useMutation({
    mutationKey: ["user", "unfollow", data],
    mutationFn: () => UserUnFollowApi({ verifyId: data! }),
  });

  const handleClickButton = async (): Promise<void> => {
    try {
      if (isFollowing) {
        await unfollowMutateAsync(undefined, {
          onSuccess: (data) => {
            toast.success(data.message);
            setIsFollowing(false);
          },
          onError: (error: Error) => {
            toast.error(error.message || "Failed to unfollow");
          },
        });
      } else {
        await followMutateAsync(undefined, {
          onSuccess: (data) => {
            toast.success(data.message);
            setIsFollowing(true);
          },
          onError: (error: Error) => {
            toast.error(error.message || "Failed to follow");
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ButtonComponent className={className} onClick={handleClickButton}>
      {isFollowing ? "Unfollow" : "Follow"}
    </ButtonComponent>
  );
}
