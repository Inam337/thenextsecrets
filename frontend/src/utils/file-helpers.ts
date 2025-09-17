/**
 * Formats file size in KB to human-readable format
 * @param kb - File size in KB
 * @returns Formatted string with appropriate unit (KB, MB, GB)
 */
export function formatFileSize(kb: number): string {
  if (kb === 0) return '0 KB';

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  } else if (kb < 1024 * 1024) {
    return `${(kb / 1024).toFixed(1)} MB`;
  }
}

/**
 * Formats file size with fallback for invalid values
 * @param size - File size in KB (number or undefined/null)
 * @returns Formatted string with appropriate unit
 */
export function formatFileSizeWithFallback(size: number | undefined | null): string {
  if (typeof size !== 'number' || size < 0) {
    return '0 KB';
  }

  return formatFileSize(size);
}
