import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt.
 * @param password - The  plain text password to hash.
 * @returns The hashed password.
 */
export const saltAndHashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
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
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error verifying password");
  }
};
