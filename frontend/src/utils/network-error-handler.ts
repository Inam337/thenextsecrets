import React from 'react';
import { toast } from 'react-hot-toast';

export interface NetworkError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError: boolean;
}

export interface ApiResponse<T = unknown> {
  response: T;
  errorMessage?: string;
  status: boolean;
}

export class NetworkErrorHandler {
  private static retryAttempts = 3;
  private static retryDelay = 1000; // 1 second

  static isNetworkError(error: unknown): boolean {
    const errorObj = error as { code?: string; message?: string; name?: string };

    return (
      !navigator.onLine
      || errorObj?.code === 'NETWORK_ERROR'
      || errorObj?.message?.includes('Network error')
      || errorObj?.message?.includes('cannot connect')
      || errorObj?.name === 'NetworkError'
      || errorObj?.code === 'ERR_NETWORK'
    );
  }

  static async handleApiResponse<T>(
    apiCall: () => Promise<ApiResponse<T>>,
    options: {
      showErrorToast?: boolean;
      retryOnFailure?: boolean;
      fallbackData?: T;
      errorContext?: string;
    } = {},
  ): Promise<{ data: T | null; error: NetworkError | null }> {
    const {
      showErrorToast = true,
      retryOnFailure = true,
      fallbackData = null,
      errorContext = 'API call',
    } = options;
    const attemptApiCall = async (attempt: number): Promise<{ data: T | null; error: NetworkError | null }> => {
      try {
        const response = await apiCall();

        if (!response.status && response.errorMessage) {
          throw new Error(response.errorMessage);
        }

        return { data: response.response, error: null };
      } catch (error: unknown) {
        const errorObj = error as { message?: string; status?: number; code?: string };
        const isNetworkErr = this.isNetworkError(error);
        const networkError: NetworkError = {
          message: errorObj.message || 'An unexpected error occurred',
          status: errorObj.status,
          code: errorObj.code,
          isNetworkError: isNetworkErr,
        };

        // Retry logic for network errors
        if (retryOnFailure && isNetworkErr && attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);

          return attemptApiCall(attempt + 1);
        }

        return { data: fallbackData, error: networkError };
      }
    };

    const result = await attemptApiCall(1);

    // Show error toast if enabled and there's an error
    if (showErrorToast && result.error) {
      this.showErrorToast(result.error, errorContext);
    }

    return result;
  }

  private static showErrorToast(error: NetworkError, context: string): void {
    if (error.isNetworkError) {
      toast.error(
        `Network connection failed while ${context}. Please check your internet connection and try again.`,
        {
          duration: 6000,
          id: 'network-error',
        },
      );
    } else {
      toast.error(
        `Failed to ${context}: ${error.message}`,
        {
          duration: 4000,
        },
      );
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getOfflineMessage(): string {
    return 'You appear to be offline. Some features may not be available.';
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }
}

// Hook for checking online status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(NetworkErrorHandler.isOnline());

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
