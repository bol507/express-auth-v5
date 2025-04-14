import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

export default class VerificationTokenModel {
  static create = async (email: string, token: string, expires: Date) => {
      const verificationToken = await prisma.verificationToken.create({
        data: {
          email,
          token,
          expires,
        },
      });
      return verificationToken; 
  };

  static getByEmail = async (email: string) => {
      const verificationToken = await prisma.verificationToken.findFirst({
        where: {
          email,
        },
      });
      return verificationToken;
    
  };

  static deleteByEmail = async (email: string) => {
   
      const verificationToken = await prisma.verificationToken.deleteMany({
        where: {
          email,
        },
      });
      return verificationToken;
    
  };
}
