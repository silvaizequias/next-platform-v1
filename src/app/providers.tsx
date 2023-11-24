'use client'

import { Fragment, ReactNode } from 'react'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import { Analytics } from '@vercel/analytics/react'

export default function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <ThemeProvider>
      <BalancerProvider>{children}</BalancerProvider>
      {!isDevelopment && (
        <Fragment>
          <Analytics />
        </Fragment>
      )}
    </ThemeProvider>
  )
}
