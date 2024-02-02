'use client'

import { Comfortaa } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600', '700'],
})

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#039be5',
      main: '#0284c7',
      dark: '#0f172a',
      contrastText: '#FFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920,
    },
  },
  shape: {
      borderRadius: 10
    },
  typography: {
    fontFamily: comfortaa.style.fontFamily,
  },
})
