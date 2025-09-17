import { type ReactNode } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { FollowUserApi } from "@/api/user/follow-user.api.ts";

import ButtonComponent from "@/components/button/button.component";

type Props = {
  className?: string;
  targetUserId: number | undefined;
  isFollowedByCurrentUser: boolean;
};
export default function FollowButtonComponent({
  className,
  targetUserId,
  isFollowedByCurrentUser,
}: Props): ReactNode {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["follow", targetUserId],
    mutationFn: FollowUserApi,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
    },
  });

  const handleButtonClick = async (): Promise<void> => {
    await mutateAsync({
      targetUserId,
      action: isFollowedByCurrentUser ? "unfollow" : "follow",
    });
  };

  return (
    <ButtonComponent
      color={isFollowedByCurrentUser ? "secondary" : "primary"}
      variant={isFollowedByCurrentUser ? "outlined" : "solid"}
      size="medium"
      className={className}
      onClick={handleButtonClick}
    >
      {isFollowedByCurrentUser ? "Unfollow" : "Follow"}
    </ButtonComponent>
  );
}
