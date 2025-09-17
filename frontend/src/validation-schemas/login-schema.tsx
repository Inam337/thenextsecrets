import { z } from 'zod';

export const createLoginSchema = (formatMessage: ({ id, defaultMessage }: { id: string; defaultMessage: string }) => string) => z.object({
  email: z
    .string()
    .min(1, formatMessage({
      id: 'login.errors.emailRequired',
      defaultMessage: 'Email is required'
    }))
    .email(formatMessage({
      id: 'login.errors.emailInvalid',
      defaultMessage: 'Please enter a valid email address'
    })),
  password: z
    .string()
    .min(1, formatMessage({
      id: 'login.errors.passwordRequired',
      defaultMessage: 'Password is required'
    }))
    .min(6, formatMessage({
      id: 'login.errors.passwordMinLength',
      defaultMessage: 'Password must be at least 6 characters'
    })),
});

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;