'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth';
import { LoadingButton, Input } from '@/components/ui';
import { createRegisterSchema, RegisterFormData } from '@/validation-schemas/register-schema';
import { CommonIcon } from '@/components/icons';
import { CommonIconNames, IconColors } from '@/components/icons/types';
import { useTranslation } from '@/hooks/use-translation';
export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const { register: registerUser } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const ICON_SIZE = 20;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { formatMessage } = useTranslation('common');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(createRegisterSchema(formatMessage)),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            console.log('Registration data:', { name: data.name, email: data.email, password: '***' });
            await registerUser(data.name, data.email, data.password);
            setSuccess(formatMessage({
                id: 'register.text.successMessage',
                defaultMessage: 'Registration successful! Please login with your credentials.'
            }));
            // Redirect to login after successful registration
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || formatMessage({
                id: 'register.errors.registrationFailed',
                defaultMessage: 'Registration failed. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 p-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {formatMessage({
                            id: 'register.text.title',
                            defaultMessage: 'Create account'
                        })}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {formatMessage({
                            id: 'register.text.subtitle',
                            defaultMessage: 'Enter your information to create your account'
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'register.labels.name',
                                    defaultMessage: 'Full Name'
                                })}
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder={formatMessage({
                                    id: 'register.placeholders.name',
                                    defaultMessage: 'Enter your full name'
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'register.labels.email',
                                    defaultMessage: 'Email'
                                })}
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={formatMessage({
                                    id: 'register.placeholders.email',
                                    defaultMessage: 'Enter your email'
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'register.labels.password',
                                    defaultMessage: 'Password'
                                })}
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={formatMessage({
                                        id: 'register.placeholders.password',
                                        defaultMessage: 'Enter your password'
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer
                                           text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? formatMessage({
                                        id: 'register.actions.hidePassword',
                                        defaultMessage: 'Hide password'
                                    }) : formatMessage({
                                        id: 'register.actions.showPassword',
                                        defaultMessage: 'Show password'
                                    })}
                                >
                                    {showPassword
                                        ? (
                                            <CommonIcon
                                                width={ICON_SIZE}
                                                height={ICON_SIZE}
                                                name={CommonIconNames.SHOW_PASSWORD_ICON}
                                                fill={IconColors.GRAY_COLOR_ICON}
                                            />
                                        )
                                        : (
                                            <CommonIcon
                                                width={ICON_SIZE}
                                                height={ICON_SIZE}
                                                name={CommonIconNames.HIDE_PASSWORD_ICON}
                                                fill={IconColors.GRAY_COLOR_ICON}
                                            />
                                        )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'register.labels.confirmPassword',
                                    defaultMessage: 'Confirm Password'
                                })}
                            </label>
                            <div className='relative'>
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder={formatMessage({
                                        id: 'register.placeholders.confirmPassword',
                                        defaultMessage: 'Confirm your password'
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    {...register('confirmPassword')}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer
                                           text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? formatMessage({
                                        id: 'register.actions.hidePassword',
                                        defaultMessage: 'Hide password'
                                    }) : formatMessage({
                                        id: 'register.actions.showPassword',
                                        defaultMessage: 'Show password'
                                    })}
                                >
                                    {showConfirmPassword
                                        ? (
                                            <CommonIcon
                                                width={ICON_SIZE}
                                                height={ICON_SIZE}
                                                name={CommonIconNames.SHOW_PASSWORD_ICON}
                                                fill={IconColors.GRAY_COLOR_ICON}
                                            />
                                        )
                                        : (
                                            <CommonIcon
                                                width={ICON_SIZE}
                                                height={ICON_SIZE}
                                                name={CommonIconNames.HIDE_PASSWORD_ICON}
                                                fill={IconColors.GRAY_COLOR_ICON}
                                            />
                                        )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {error && (
                            <div className="p-3 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 text-sm bg-green-50 text-green-600 border border-green-200 rounded-md">
                                {success}
                            </div>
                        )}

                        <LoadingButton
                            type="submit"
                            variant="default"
                            className="w-full"
                            loading={isLoading}
                            loadingText={formatMessage({
                                id: 'register.actions.creatingAccount',
                                defaultMessage: 'Creating account...'
                            })}
                        >
                            {formatMessage({
                                id: 'register.actions.createAccount',
                                defaultMessage: 'Create account'
                            })}
                        </LoadingButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {formatMessage({
                                id: 'register.text.hasAccount',
                                defaultMessage: 'Already have an account?'
                            })}{' '}
                            <a href="/login" className="font-medium text-green-600 hover:text-green-500">
                                {formatMessage({
                                    id: 'register.text.signInLink',
                                    defaultMessage: 'Sign in'
                                })}
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}