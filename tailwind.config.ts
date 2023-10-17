//import type { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

module.exports = withMT ({
  darkMode: 'class',
  content: [
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)']
      }
    },
  },
  plugins: [],
})
