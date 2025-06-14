
export interface RetryOptions {
  maxRetries: number;
  delay: number;
  backoff: number;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delay: 1000, backoff: 2 }
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === options.maxRetries) {
        break;
      }
      
      // Don't retry on authentication errors
      if (error instanceof Error && (
        error.message.includes('401') ||
        error.message.includes('403') ||
        error.message.includes('API key')
      )) {
        break;
      }
      
      const delay = options.delay * Math.pow(options.backoff, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

export const isRetryableError = (error: Error): boolean => {
  const retryableMessages = [
    'network error',
    'timeout',
    'rate limit',
    '429',
    '500',
    '502',
    '503',
    '504'
  ];
  
  return retryableMessages.some(msg => 
    error.message.toLowerCase().includes(msg)
  );
};
