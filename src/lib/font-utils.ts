/**
 * Helper function to get the correct path for fonts, adjusting for basePath in production
 */
export function getFontPath(fontPath: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/chemistry-quiz' : '';
  
  // Ensure the path starts with a slash if it doesn't already
  const normalizedPath = fontPath.startsWith('/') ? fontPath : `/${fontPath}`;
  
  return `${basePath}${normalizedPath}`;
} 