import withMT from '@material-tailwind/react/utils/withMT'

/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

module.exports = withMT({
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-comfortaa)'],
        sans: ['var(--font-poppins)'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        cyan: colors.cyan,
        sky: colors.sky,
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
})
