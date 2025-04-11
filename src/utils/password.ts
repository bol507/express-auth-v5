import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const saltAndHashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error: unknown) {
    throw new Error("Error hashing password");
  }
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compareSync(password, hashedPassword);
    return isMatch;
  } catch (error: unknown) {
    throw new Error("Error verifying password");
  }
};
