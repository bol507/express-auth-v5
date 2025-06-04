import { User } from "@prisma/client";

export interface UserDocument extends User {}

export interface UserModel {
  getByEmail(email: string): Promise<UserDocument | null> ;
  getById(id: string): Promise<UserDocument | null> ;
  create(user: CreateUserType ): Promise<UserDocument>;
}

export type CreateUserType = Pick<
  User,
  "email" | "password" | "name"
>

export type UpdateUserType = Partial<User>