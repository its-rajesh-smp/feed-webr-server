import * as bcrypt from 'bcrypt';
import { getEnv } from './env.util';

/**
 * Hashes the password using bcrypt
 * @param password
 * @returns Promise<string>
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = getEnv('SALT_ROUNDS');
  return await bcrypt.hash(password, bcrypt.genSaltSync(+saltRounds));
};

/**
 * Compares the password with the hash
 * @param password
 * @param hash
 * @returns Promise<boolean>
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};