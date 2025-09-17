'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingButton, Input } from '@/components/ui';
import { createForgotPasswordSchema, ForgotPasswordFormData } from '@/validation-schemas/forgot-password-schema';
import { useTranslation } from '@/hooks/use-translation';

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const { formatMessage } = useTranslation('common');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(createForgotPasswordSchema(formatMessage)),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // TODO: Implement forgot password API call
            // await forgotPasswordService.sendResetLink(data.email);
            
            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSuccess(formatMessage({
                id: 'forgotPassword.text.successMessage',
                defaultMessage: 'Password reset link has been sent to your email address.'
            }));
            
            // Redirect to login after showing success message
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.message || formatMessage({
                id: 'forgotPassword.errors.sendFailed',
                defaultMessage: 'Failed to send reset link. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {formatMessage({
                            id: 'forgotPassword.text.title',
                            defaultMessage: 'Forgot Password'
                        })}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {formatMessage({
                            id: 'forgotPassword.text.subtitle',
                            defaultMessage: "Enter your email address and we'll send you a link to reset your password"
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                {formatMessage({
                                    id: 'forgotPassword.labels.email',
                                    defaultMessage: 'Email Address'
                                })}
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={formatMessage({
                                    id: 'forgotPassword.placeholders.email',
                                    defaultMessage: 'Enter your email address'
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
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
                                id: 'forgotPassword.actions.sendingLink',
                                defaultMessage: 'Sending link...'
                            })}
                        >
                            {formatMessage({
                                id: 'forgotPassword.actions.sendResetLink',
                                defaultMessage: 'Send Reset Link'
                            })}
                        </LoadingButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {formatMessage({
                                id: 'forgotPassword.text.rememberPassword',
                                defaultMessage: 'Remember your password?'
                            })}{' '}
                            <a href="/login" className="font-medium text-green-600 hover:text-green-500">
                                {formatMessage({
                                    id: 'forgotPassword.text.signInLink',
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