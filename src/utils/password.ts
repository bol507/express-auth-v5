import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const saltAndHashPassword =  (password: string) => {
  try {
    const salt =  bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword =  bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error: unknown) {
    throw new Error("Error hashing password");
  }
};

export const verifyPassword =  (password: string, hashedPassword: string) => {
  try {
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
  } catch (error: unknown) {
    throw new Error("Error verifying password");
  }
};
