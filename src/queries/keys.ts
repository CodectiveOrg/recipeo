export const authKeys = {
  all: ["auth"] as const,
  verify: () => ["auth", "verify"] as const,
};

export const userKeys = {
  all: ["user"] as const,
  detail: (userId: number | string | undefined) => ["user", userId] as const,
};

export const tagKeys = {
  all: ["tags"] as const,
};

export type InfiniteRecipesType = "popular" | "chosen" | "recent";
export type UserRecipesTab = "all" | "liked";

export type RecipeListScope =
  | { type: InfiniteRecipesType }
  | { type: "featured" }
  | { type: "user"; tab: UserRecipesTab; userId: number | string | undefined }
  | { type: "search"; queryString: string };

export const recipeKeys = {
  all: ["recipes"] as const,
  list: (scope: RecipeListScope) => {
    switch (scope.type) {
      case "featured":
        return ["recipes", "featured"] as const;
      case "popular":
        return ["recipes", "popular"] as const;
      case "chosen":
        return ["recipes", "chosen"] as const;
      case "recent":
        return ["recipes", "recent"] as const;
      case "user":
        return [
          "user",
          scope.tab === "all" ? "all-tab" : "liked-tab",
          "recipes",
          scope.userId,
        ] as const;
      case "search":
        return ["recipes", "search", scope.queryString] as const;
    }
  },
  detail: (recipeId: number | string | undefined) =>
    ["recipe", recipeId] as const,
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signUp: () => ["auth", "sign-up"] as const,
  signOut: () => ["auth", "sign-out"] as const,
  updateUser: (userId: number | string | undefined) =>
    ["user", "update", userId] as const,
  createRecipe: () => ["recipe", "create"] as const,
  likeRecipe: (recipeId: number | string | undefined) =>
    ["recipe", "like", recipeId] as const,
  followUser: (targetUserId: number | string | undefined) =>
    ["user", "follow", targetUserId] as const,
};
