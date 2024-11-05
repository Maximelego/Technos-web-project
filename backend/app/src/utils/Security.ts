import * as bcrypt from 'bcrypt';

export async function hashPassword(passwordToHash: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(passwordToHash, salt);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
