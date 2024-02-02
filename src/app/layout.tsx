import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ReactNode } from 'react'
import { theme } from './theme'
import { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  )
}
