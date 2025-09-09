import { Ingredient } from "@/entities/ingredient";
import { Like } from "@/entities/like";
import { Step } from "@/entities/step";
import { Tag } from "@/entities/tag";
import type { EssentialUser } from "@/entities/user.ts";

export class Recipe {
  public id!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public picture!: string | null;
  public isChosen!: boolean;
  public tags!: Tag[];
  public ingredients!: Ingredient[];
  public steps!: Step[];
  public user!: EssentialUser;
  public likes!: Like[];
  public createdAt!: Date;
  public updatedAt!: Date;
  public likesCount!: number;
  public isLikedByCurrentUser!: boolean;
}
