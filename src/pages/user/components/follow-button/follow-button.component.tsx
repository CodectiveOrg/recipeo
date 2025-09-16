import { type ReactNode, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { UserFollowApi } from "@/api/user/user-follow.api";
import { UserUnFollowApi } from "@/api/user/user-unfollow.api";

import ButtonComponent from "@/components/button/button.component";

type Props = {
  userId: number | undefined;
  className?: string;
};
export default function FollowButtonComponent({
  userId,
  className,
}: Props): ReactNode {
  const [isFollowing, setIsFollowing] = useState(false);

  const { mutateAsync: followMutateAsync } = useMutation({
    mutationKey: ["user", "follow", userId],
    mutationFn: () => UserFollowApi({ targetUserId: userId }),
  });

  const { mutateAsync: unfollowMutateAsync } = useMutation({
    mutationKey: ["user", "unfollow", userId],
    mutationFn: () => UserUnFollowApi({ targetUserId: userId }),
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
            toast.error(error.message);
          },
        });
      } else {
        await followMutateAsync(undefined, {
          onSuccess: (data) => {
            toast.success(data.message);
            setIsFollowing(true);
          },
          onError: (error: Error) => {
            toast.error(error.message);
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ButtonComponent
      size="medium"
      className={className}
      onClick={handleClickButton}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </ButtonComponent>
  );
}
