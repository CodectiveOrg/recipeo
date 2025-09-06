export class User {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public picture!: string | null;
}

export type EssentialUser = Pick<User, "username" | "picture">;
