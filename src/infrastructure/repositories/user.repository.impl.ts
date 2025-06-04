import UserEntity from "@src/domain/entities/user.entitiy";
import { UserRepository } from "@src/domain/repositories/user.repository";
import { prisma } from "@src/utils/prisma";
import { UserMapper } from "../mappers/user.mapper";

class UserRepositoryImpl implements UserRepository {


  async getById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        accounts: {
          include: {
            user: true,
          },
        }
      },
    });

    return user ? UserMapper.toEntity(user) : null;
  }

  async getByEmail(email: string):Promise<UserEntity | null> {
     const user =await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: {
          include: { user: true },
        },
      },
    });
    return user ? UserMapper.toEntity(user) : null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userCreated = await prisma.user.create({ data: user });
    return UserMapper.toEntity(userCreated);
  }
}

export default UserRepositoryImpl;