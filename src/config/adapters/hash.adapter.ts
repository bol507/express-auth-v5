import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt.
 * @param password - The  plain text password to hash.
 * @returns The hashed password.
 */
export const saltAndHashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
    return await bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Verify a plain text password against a hashed password.
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    throw new Error("Error verifying password");
  }
};
