export class User {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public picture!: string | null;
  public followersCount!: string;
  public followingCount!: string;
  public recipesCount!: string;
}

export type EssentialUser = Pick<User, "id" | "username" | "picture">;
