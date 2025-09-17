import { z } from 'zod';

export const createRegisterSchema = (formatMessage: ({ id, defaultMessage }: { id: string; defaultMessage: string }) => string) => z.object({
  name: z
    .string()
    .min(1, formatMessage({
      id: 'register.errors.nameRequired',
      defaultMessage: 'Full name is required'
    }))
    .min(2, formatMessage({
      id: 'register.errors.nameMinLength',
      defaultMessage: 'Name must be at least 2 characters'
    }))
    .max(100, formatMessage({
      id: 'register.errors.nameMaxLength',
      defaultMessage: 'Name must be less than 100 characters'
    }))
    .regex(/^[a-zA-Z\s]+$/, formatMessage({
      id: 'register.errors.nameInvalid',
      defaultMessage: 'Name can only contain letters and spaces'
    })),
  email: z
    .string()
    .min(1, formatMessage({
      id: 'register.errors.emailRequired',
      defaultMessage: 'Email is required'
    }))
    .email(formatMessage({
      id: 'register.errors.emailInvalid',
      defaultMessage: 'Please enter a valid email address'
    })),
  password: z
    .string()
    .min(1, formatMessage({
      id: 'register.errors.passwordRequired',
      defaultMessage: 'Password is required'
    }))
    .min(6, formatMessage({
      id: 'register.errors.passwordMinLength',
      defaultMessage: 'Password must be at least 6 characters'
    }))
    .max(100, formatMessage({
      id: 'register.errors.passwordMaxLength',
      defaultMessage: 'Password must be less than 100 characters'
    }))
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      formatMessage({
        id: 'register.errors.passwordComplexity',
        defaultMessage: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      })
    ),
  confirmPassword: z
    .string()
    .min(1, formatMessage({
      id: 'register.errors.confirmPasswordRequired',
      defaultMessage: 'Please confirm your password'
    })),
}).refine((data) => data.password === data.confirmPassword, {
  message: formatMessage({
    id: 'register.errors.passwordsDoNotMatch',
    defaultMessage: 'Passwords do not match'
  }),
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;