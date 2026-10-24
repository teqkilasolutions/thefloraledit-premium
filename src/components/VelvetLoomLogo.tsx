import React from 'react';

interface LogoProps {
  variant?: 'ivory' | 'dark' | 'auto';
  className?: string;
  size?: 'xs' | 'sm' | 'nav' | 'md' | 'lg';
  isScrolled?: boolean;
}

/**
 * VelvetLoomLogo Component
 * Strictly renders the supplied official Velvet Loom identity:
 * - Thread spool & needle symbol
 * - VELVET LOOM wordmark
 * - Luxury Fashion Studio
 * - Weaving Style, Defining Elegance
 * 
 * Never stretched, natural proportions preserved, no rounded container, zero drop shadow.
 */
export const VelvetLoomLogo: React.FC<LogoProps> = ({
  variant = 'auto',
  className = '',
  size = 'nav',
  isScrolled: _isScrolled = false,
}) => {
  const isDarkTheme = variant === 'dark';
  
  const src = isDarkTheme
    ? '/assets/brand/velvet-loom-logo-dark-clean.png'
    : '/assets/brand/velvet-loom-logo-ivory-clean.png';

  const sizeClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9 lg:h-10',
    nav: 'h-8 sm:h-9 lg:h-10',
    md: 'h-11 sm:h-12 lg:h-14',
    lg: 'h-16 sm:h-20 lg:h-24',
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img
        src={src}
        alt="VELVET LOOM — Luxury Fashion Studio | Weaving Style, Defining Elegance"
        className={`${sizeClasses[size]} w-auto object-contain transition-all duration-500 ease-luxury`}
        loading="eager"
      />
    </div>
  );
};
