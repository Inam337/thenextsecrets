import { z } from 'zod';

export const createForgotPasswordSchema = (formatMessage: ({ id, defaultMessage }: { id: string; defaultMessage: string }) => string) => z.object({
  email: z
    .string()
    .min(1, formatMessage({
      id: 'forgotPassword.errors.emailRequired',
      defaultMessage: 'Email address is required'
    }))
    .email(formatMessage({
      id: 'forgotPassword.errors.emailInvalid',
      defaultMessage: 'Please enter a valid email address'
    })),
});

export type ForgotPasswordFormData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
