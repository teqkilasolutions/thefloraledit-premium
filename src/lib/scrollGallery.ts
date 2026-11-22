export function scrollGalleryFrame(progress: number, width: number, height: number) {
  const p = Math.min(1, Math.max(0, progress));
  const ease = p * p * (3 - 2 * p);
  const initialWidth = width * (width < 700 ? .52 : .36);
  const initialHeight = height * .72;
  const imageWidth = initialWidth + (width - initialWidth) * ease;
  const imageHeight = initialHeight + (height - initialHeight) * ease;
  return { width: imageWidth, height: imageHeight, x: (width - imageWidth) / 2, y: (height - imageHeight) / 2, radius: 3 * (1 - ease) };
}
