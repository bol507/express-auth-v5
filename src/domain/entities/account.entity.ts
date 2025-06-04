class Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken: string | null;
  accessToken: string | null;
  expiresAt: number | null;
  tokenType: string | null;
  scope: string | null;
  idToken: string | null;
  sessionState: string | null;

  constructor(
    id: string,
    userId: string,
    type: string,
    provider: string,
    providerAccountId: string,
    refreshToken: string | null,
    accessToken: string | null,
    expiresAt: number | null,
    tokenType: string | null,
    scope: string | null,
    idToken: string | null,
    sessionState: string | null
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.provider = provider;
    this.providerAccountId = providerAccountId;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
    this.tokenType = tokenType;
    this.scope = scope;
    this.idToken = idToken;
    this.sessionState = sessionState;
  }
}

export default Account;