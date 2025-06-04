import UserEntity from "@src/domain/entities/user.entitiy";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toEntity(prismaUser: PrismaUser): UserEntity {

    

    return new UserEntity(
      prismaUser.id,
      prismaUser.email ?? undefined, 
      prismaUser.name ?? undefined,
      prismaUser.emailVerified ?? undefined,
      prismaUser.image ?? undefined,
      prismaUser.password ?? undefined
    );
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