'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonIcon } from '@/components/icons';
import { CommonIconNames, IconColors } from '@/components/icons/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth';
import { AppConstants } from '@/common/app-constants';
import { LoadingButton, Input } from '@/components/ui';
import { createLoginSchema, LoginFormData } from '@/validation-schemas/login-schema';
import { useTranslation } from '@/hooks/use-translation';

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const ICON_SIZE = 20;
    const { login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const { formatMessage } = useTranslation('common');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(createLoginSchema(formatMessage)),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await login(data.email, data.password);
            router.push(AppConstants.Routes.Private.Dashboard);
        } catch (err) {
            setError(formatMessage({
                id: 'login.errors.invalidCredentials',
                defaultMessage: 'Invalid email or password'
            }));
        } finally {
            setIsLoading(false);
        }
    };
    // Clear cache when component mounts
    useEffect(() => {
        const clearAllCaches = async () => {
            try {
                localStorage.clear();
                sessionStorage.clear();

                // Clear Service Worker cache if available
                if ('serviceWorker' in navigator && 'caches' in window) {
                    try {
                        const cacheNames = await caches.keys();

                        await Promise.all(
                            cacheNames.map(cacheName => caches.delete(cacheName)),
                        );
                    } catch (cacheError) {

                    }
                }

                // Clear cookies (except essential ones)
                document.cookie.split(';').forEach((cookie) => {
                    const eqPos = cookie.indexOf('=');
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

                    // Don't clear essential cookies like language preference
                    if (!name.trim().startsWith('i18n') && !name.trim().startsWith('NEXT_LOCALE')) {
                        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                    }
                });
            } catch (error) {

            }
        };

        clearAllCaches();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {formatMessage({
                            id: 'login.text.title',
                            defaultMessage: 'Sign in'
                        })}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {formatMessage({
                            id: 'login.text.subtitle',
                            defaultMessage: 'Enter your email and password to access your account'
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'login.labels.email',
                                    defaultMessage: 'Email'
                                })}
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={formatMessage({
                                    id: 'login.placeholders.email',
                                    defaultMessage: 'Enter your email'
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 ">
                            <label htmlFor="password" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'login.labels.password',
                                    defaultMessage: 'Password'
                                })}
                            </label>
                            <div className='relative'>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={formatMessage({
                                        id: 'login.placeholders.password',
                                        defaultMessage: 'Enter your password'
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    {...register('password')}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer
               text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? formatMessage({
                                        id: 'login.actions.hidePassword',
                                        defaultMessage: 'Hide password'
                                    }) : formatMessage({
                                        id: 'login.actions.showPassword',
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

                        </div>

                        <div className="text-right">
                            <a 
                                href="/forgot-password" 
                                className="text-sm text-green-600 hover:text-green-500"
                            >
                                {formatMessage({
                                    id: 'login.actions.forgotPassword',
                                    defaultMessage: 'Forgot your password?'
                                })}
                            </a>
                        </div>

                        {error && (
                            <div className="p-3 text-sm bg-black text-amber-200 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}

                        <LoadingButton
                            type="submit"
                            variant="default"
                            className="w-full"
                            loading={isLoading}
                            loadingText={formatMessage({
                                id: 'login.actions.signingIn',
                                defaultMessage: 'Signing in...'
                            })}
                        >
                            {formatMessage({
                                id: 'login.actions.signIn',
                                defaultMessage: 'Sign in'
                            })}
                        </LoadingButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {formatMessage({
                                id: 'login.text.noAccount',
                                defaultMessage: "Don't have an account?"
                            })}{' '}
                            <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                                {formatMessage({
                                    id: 'login.text.signUpLink',
                                    defaultMessage: 'Sign up'
                                })}
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}