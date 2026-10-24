/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Concept 01: The Editorial Garden
        'garden-ivory': '#F8F6EF',
        'garden-olive': '#536336',
        'garden-forest': '#26382C',
        'garden-sage': '#AAB39A',
        'garden-sand': '#E9E1D4',
        'garden-charcoal': '#292A25',

        // Concept 02: The Botanical Atelier
        'atelier-forest': '#26382C',
        'atelier-olive': '#536336',
        'atelier-ivory': '#F8F6EF',
        'atelier-sage': '#AAB39A',
        'atelier-moss': '#737D51',
        'atelier-gold': '#B8A276',

        // Concept 03: The Celebration House
        'celebration-ivory': '#FAF7F1',
        'celebration-blush': '#D9B4A4',
        'celebration-olive': '#536336',
        'celebration-sand': '#E9E1D4',
        'celebration-rose': '#AA8175',
        'celebration-brown': '#3B302C',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        marcellus: ['"Marcellus"', 'serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
        'ultra-wide': '0.32em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
