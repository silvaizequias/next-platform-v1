'use client'

import { Comfortaa } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: comfortaa.style.fontFamily,
  },
})
