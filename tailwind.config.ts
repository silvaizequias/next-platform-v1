import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react"

const config: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-comfortaa)'],
        sans: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
export default config
