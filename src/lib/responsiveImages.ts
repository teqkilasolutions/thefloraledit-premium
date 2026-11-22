const WIDTHS = [480, 800, 1200, 1600];

export function responsivePhotoUrl(base: string, id: string, width = 800, format = 'webp') {
  return `${base}assets/optimized/${id}-${width}.${format}`;
}

export function responsivePhotoSet(base: string, id: string, format = 'webp') {
  return WIDTHS.map(width => `${responsivePhotoUrl(base, id, width, format)} ${width}w`).join(', ');
}
