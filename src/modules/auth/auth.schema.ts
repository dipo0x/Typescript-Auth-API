import { z } from 'zod';

const userCore = {
  name: z.string({
    required_error: 'Name is necessary',
    invalid_type_error: 'Name is invalid',
  }),
};

const authCore = {
  email: z.string({
    required_error: 'Email is necessary',
    invalid_type_error: 'Email is invalid',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
};
const createUserSchema = z.object({
  ...userCore,
  ...authCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;