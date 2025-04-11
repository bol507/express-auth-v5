import { PrismaClient, User } from "@prisma/client";
import { CreateUserType } from "@src/interfaces/user";

const prisma = new PrismaClient();

export default class UserModel {
  static getById = async (id: string) => (
    await prisma.user.findUnique({
      where: {
        id,
      },
    })
  );

  static getByEmail = async (email: string) => (
    await prisma.user.findUnique({
      where: {
        email,
      },
    })  
  );

  static create = async (user: CreateUserType) => (
    await prisma.user.create({
      data: user,
    })
  );
}