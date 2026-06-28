/**
 * Design System : Auto-École Mozart
 * Tokens TypeScript pour autocomplétion et documentation
 */

export const colors = {
  primary: {
    50: '#FFF1F0',
    100: '#FFE0DD',
    200: '#FFB8B0',
    300: '#FF8A7A',
    400: '#F04A35',
    500: '#E62100',
    600: '#C62333',
    700: '#A81E2A',
    800: '#8B1822',
    900: '#6B1219',
  },
  secondary: {
    50: '#E8EDF4',
    100: '#C5D0E0',
    200: '#8FA3C0',
    300: '#5A7599',
    400: '#2E4A6E',
    500: '#021E40',
    600: '#021A38',
    700: '#011530',
    800: '#011127',
    900: '#000C1E',
  },
  accent: {
    50: '#FFF9E6',
    100: '#FFF0BF',
    200: '#FFE080',
    300: '#F8C840',
    400: '#E8B020',
    500: '#C9A227',
    600: '#A8851F',
    700: '#876818',
    800: '#664D12',
    900: '#45330C',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#059669',
    600: '#047857',
    700: '#065F46',
    800: '#064E3B',
    900: '#022C22',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#DC3545',
    600: '#B91C1C',
    700: '#991B1B',
    800: '#7F1D1D',
    900: '#450A0A',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F8F9FA',
    100: '#F5F5F5',
    200: '#EBEBEB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#696868',
    600: '#4B5563',
    700: '#374151',
    800: '#2D2D2D',
    900: '#1F2937',
    950: '#0A1628',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

export const radius = {
  none: '0',
  sm: '0.375rem',
  md: '0.625rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const fontFamily = {
  heading: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'featured';
export type HeroVariant = 'home' | 'page' | 'formation';
