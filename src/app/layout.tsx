import ThemeRegistry from '@/components/ThemeRegistry'
import DefaultLayout from '@/layouts/DefaultLayout'
import { LayoutProps } from '@/types'

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <DefaultLayout>{children}</DefaultLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}
