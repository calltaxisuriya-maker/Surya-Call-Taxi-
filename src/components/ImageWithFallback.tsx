import { useState } from 'react';
import { Car } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle = 'Surya Call Taxi',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-[#0e243d] to-slate-900 text-slate-200 p-6 ${className}`}
      >
        <Car className="w-10 h-10 text-amber-400 mb-3" aria-hidden="true" />
        <span className="text-sm font-medium tracking-tight text-center text-slate-200">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
