'use client'

import { Comfortaa } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
import { colors } from '@mui/material'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600', '700'],
})

export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        light: colors.lightBlue[200],
        main: colors.blue[400],
        dark: colors.lightBlue[800],
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
      borderRadius: 10,
    },
    typography: {
      fontFamily: comfortaa.style.fontFamily,
    },
  },
  ptBR,
)
