import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useLikeMutation(recipeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["like-button", recipeId],
    mutationFn: likeRecipeApi,
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recipe"] });
    },
  });
}
