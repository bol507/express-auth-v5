import Account from "@src/domain/entities/account.entity";
import { Account as PrismaAccount } from "@prisma/client";

export class AccountMapper {
  static toEntity(prismaAccount: PrismaAccount): Account {
    return new Account(
      prismaAccount.id,
      prismaAccount.userId,
      prismaAccount.type,
      prismaAccount.provider,
      prismaAccount.providerAccountId,
      prismaAccount.refresh_token,
      prismaAccount.access_token,
      prismaAccount.expires_at,
      prismaAccount.token_type,
      prismaAccount.scope,
      prismaAccount.id_token,
      prismaAccount.session_state
    );
  }

  static toPrisma(account: Account): Omit<PrismaAccount, 'id'> {
    return {
      userId: account.userId,
      type: account.type,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      refresh_token: account.refreshToken,
      access_token: account.accessToken,
      expires_at: account.expiresAt,
      token_type: account.tokenType,
      scope: account.scope,
      id_token: account.idToken,
      session_state: account.sessionState,
    };
  }
}