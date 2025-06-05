import UserEntity from "@src/domain/entities/user.entitiy";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toEntity(prismaUser: PrismaUser): UserEntity {
    return new UserEntity({
      id: prismaUser.id,
      email: prismaUser.email ?? undefined, 
      name: prismaUser.name ?? undefined,
      emailVerified: prismaUser.emailVerified ?? undefined,
      image: prismaUser.image ?? undefined,
      password: prismaUser.password ?? undefined,
    });
  }

  static toPrisma(userEntity: UserEntity): Omit<PrismaUser, 'id'> {
    return {
      email: userEntity.email ?? null,
      name: userEntity.name ?? null, 
      emailVerified: userEntity.emailVerified ?? null, 
      image: userEntity.image ?? null, 
      password: userEntity.password ?? null, 
    };
  }
}