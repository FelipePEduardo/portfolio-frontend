import { z } from 'zod';
import { UserSchema } from '../User';

export const AuthSchema = z.object({
  token: z.string().optional(),
  user: UserSchema.optional(),
});

export type AuthDto = z.infer<typeof AuthSchema>;
