import type { Recipe } from "@/entities/recipe.ts";

export class FeaturedRecipe {
  public id!: number;
  public picture!: string | null;
  public recipe!: Recipe;
  public createdAt!: Date;
  public updatedAt!: Date;
}
