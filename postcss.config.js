import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

export default {
  plugins: [tailwindcss(), autoprefixer(), ...(process.env.NODE_ENV === 'production' ? [purgeCSSPlugin({
    content: ['./index.html', './src/components/floral/**/*.{ts,tsx}', './src/context/*Context.tsx'],
    safelist: [/^is-/, /^has-/, /^project-/, /^form-panel-/, /^detail-print-/, /^fan-/],
    keyframes: false,
    fontFace: false,
    variables: false,
  })] : [])],
};
