import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    },
    colors: {
      heaven: {
        900: '#5bcbffff',
        800: '#7cd5ffff',
        700: '#96ddffff',
        600: '#abe4ffff',
        500: '#bce9ffff',
        400: '#c9edffff',
        300: '#d4f1ffff',
        200: '#ddf4ffff',
        100: '#e4f6ffff',
        50: '#e9f8ffff',
      },
      solar: {
        900: '#ffae00ff',
        800: '#ffbe33ff',
        700: '#ffcb5cff',
        600: '#ffd57dff',
        500: '#ffdd97ff',
        400: '#ffe4acff',
        300: '#ffe9bdff',
        200: '#ffedcaff',
        100: '#fff1d5ff',
        50: '#fff4ddff',
      },
      lunar: {
        900: '#343233ff',
        800: '#555657ff',
        700: '#707274ff',
        600: '#85898bff',
        500: '#969b9dff',
        400: '#a4aaacff',
        300: '#afb6b8ff',
        200: '#b8bfc1ff',
        100: '#bfc6c9ff',
        50: '#dbe4e7ff',
      },
      horizon: {
        900: '#275c75ff',
        800: '#527a8aff',
        700: '#7595a1ff',
        600: '#91aab4ff',
        500: '#a7bbc3ff',
        400: '#b9c9cfff',
        300: '#c7d4d9ff',
        200: '#d2dde1ff',
        100: '#dbe4e7ff',
        50: '#e2e9ecff',
      },
      ground: {
        900: '#254c2cff',
        800: '#4c6e56ff',
        700: '#708b78ff',
        600: '#8da293ff',
        500: '#a4b5a9ff',
        400: '#b6c4baff',
        300: '#c5d0c8ff',
        200: '#d1d9d3ff',
        100: '#dae1dcff',
        50: '#e1e7e3ff',
      },
    },
  },
  plugins: [],
}
export default config
