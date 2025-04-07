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
