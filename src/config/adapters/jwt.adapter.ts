import jwt, { SignOptions } from "jsonwebtoken"

interface Payload {
  [key: string]: string | number | boolean
}

class Token {
  generate(payload: Payload) {
    throw new Error("Method not implented")
  }
  verify(token: string) {
    throw new Error("Method no implemented")
  }
}

class JwtAdapter extends Token {
  private secretKey: string;

  constructor() {
    super();
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET environment variable is required");
    }
    this.secretKey = secretKey;
  }

  async generate(payload: Payload): Promise<string> {
    const expiresIn = process.env.JWT_EXPIRES_IN || "2h";
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretKey, { expiresIn } as SignOptions, (err, token) => {
        if (err) {
          return reject(new Error("Token generation failed"));
        }
        resolve(token!);
      });
    });
  }

  async verify(token: string): Promise<Payload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          return reject(new Error("Invalid token"));
        }
        resolve(decoded as Payload);
      });
    });
  }
}

export default JwtAdapter;