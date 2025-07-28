import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

// Assuming the user table in Supabase has these columns.
// You might need to adjust this based on your actual table structure.
export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string; // Column name in Supabase
  role?: string;
}
export class UserService {
  /**
   * Finds a user by their email address.
   * @param email The email of the user to find.
   * @returns A user object or null if not found.
   */
  static async getByEmail(email: string): Promise<User | null> {
    const { data: user, error } = await supabase
    .from('users') // Assuming your table is named 'users'
    .select('*')
    .eq('email', email)
    .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = 'No rows found'
      console.error('Error fetching user by email:', error);
      return null;
    }

    return user;
  }

  /**
   * Verifies a user's email and password.
   * @param email The user's email.
   * @param password The user's password.
   * @returns A user object if the credentials are valid, otherwise null.
   */
  static async verifyEmailPassword(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.getByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }

}
