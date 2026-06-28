import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Chargement prioritaire (LCP) : désactive lazy */
  priority?: boolean;
}

/**
 * Image optimisée Core Web Vitals : lazy loading, decoding async, dimensions explicites.
 */
export function OptimizedImage({
  priority = false,
  loading,
  decoding = 'async',
  alt,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  return (
    <img
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding}
      fetchPriority={priority ? 'high' : undefined}
      alt={alt ?? ''}
      width={width}
      height={height}
      {...props}
    />
  );
}
