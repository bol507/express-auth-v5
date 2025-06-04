import { PrismaClient, User } from "@prisma/client";
import { CreateUserType } from "@src/interfaces/user.interface";

const prisma = new PrismaClient();

export default class UserModel {
  static getById = async (id: string) => (
    await prisma.user.findUnique({
      where: {
        id,
      }, 
      include: {  
        accounts: {
          include: {
            user: true,
          }
        }
      },
    })
  );

  static getByEmail = async (email: string) => (
    await prisma.user.findUnique({
      where: {
        email,
      },
      include: {  
        accounts: {
          include: {
            user: true,
          }
        }
      },
    })  
  );

  static create = async (user: CreateUserType) => (
    await prisma.user.create({
      data: user,
    })
  );

}