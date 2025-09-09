import { Recipe } from "@/entities/recipe";
import type { EssentialUser } from "@/entities/user.ts";

export class Like {
  public id!: number;
  public user!: EssentialUser;
  public recipe!: Recipe;
  public createdAt!: Date;
}
