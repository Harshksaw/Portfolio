/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: '#04071d',  // Very dark navy (rgb(4,7,29))
          darker: '#0c0e23',   // Dark navy (rgb(12,14,35))
          dark: '#001152',     // Deep blue
          main: '#1271ff',     // Bright blue (rgb(18,113,255))
          light: '#64dcff',    // Cyan (rgb(100,220,255))
          violet: '#dd4aff',   // Magenta (rgb(221,74,255))
          purple: '#6c00a2',   // Deep purple (rgb(108,0,162))
          'violet-light': '#8c64ff', // Light purple (rgb(140,100,255))
          cyan: '#06b6d4',     // Cyan accent
          sky: '#0ea5e9',      // Sky blue
        },
        'black-100': 'hsl(240, 10%, 3.9%)', // Near-black navy
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        bitcount: ['Bitcount Prop Double', 'monospace'],
      },
      spacing: {
        '32': '8rem',
        '48': '12rem',
      },
      lineHeight: {
        '32': '8rem',
        '48': '12rem',
      },
      letterSpacing: {
        '0.12em': '0.12em',
        '0.2em': '0.2em',
      },
      zIndex: {
        '100': '100',
      },
      animation: {
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
  plugins: [],
}