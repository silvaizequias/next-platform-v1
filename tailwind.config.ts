import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
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
}
export default config
