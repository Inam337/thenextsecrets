import { Inter, Noto_Sans_Arabic } from 'next/font/google';

// Optimized font loading with next/font
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-noto-arabic',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false, // Only preload if Arabic is critical
  fallback: ['system-ui', 'arial'],
});

// Font class names for use in components
export const fontClassNames = `${inter.variable} ${notoSansArabic.variable}`;
