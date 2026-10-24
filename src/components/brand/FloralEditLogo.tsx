import React from 'react';

interface FloralEditLogoProps {
  variant?: 'dark-transparent' | 'white-transparent' | 'original-badge' | 'monogram-dark' | 'monogram-white';
  className?: string;
  alt?: string;
}

export const FloralEditLogo: React.FC<FloralEditLogoProps> = ({
  variant = 'dark-transparent',
  className = 'h-10 w-auto',
  alt = 'The Floral Edit — Where Floral Meets Design'
}) => {
  const base = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : `${import.meta.env.BASE_URL}/`;

  let filename = 'the-floral-edit-dark.png';

  switch (variant) {
    case 'white-transparent':
      filename = 'the-floral-edit-white.png';
      break;
    case 'original-badge':
      filename = 'the-floral-edit-badge.png';
      break;
    case 'monogram-dark':
      filename = 'the-floral-edit-monogram-dark.png';
      break;
    case 'monogram-white':
      filename = 'the-floral-edit-monogram-white.png';
      break;
    case 'dark-transparent':
    default:
      filename = 'the-floral-edit-dark.png';
      break;
  }

  const src = `${base}assets/brand/${filename}`;

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain transition-all duration-300 ${className}`}
      loading="eager"
    />
  );
};
