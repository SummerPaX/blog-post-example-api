import { createHash } from 'node:crypto';

export class AuthUtils {
  static hash(password: string): string {
    return createHash('sha512').update(password).digest('hex');
  }

  static compare(hash: string, password: string): boolean {
    return hash === this.hash(password);
  }
}
