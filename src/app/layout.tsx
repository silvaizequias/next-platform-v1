import ThemeRegistry from '@/components/ThemeRegistry'
import { LayoutProps } from '@/types'
import Provider from './provider'

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <Provider>{children}</Provider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
