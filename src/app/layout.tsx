import { LayoutProps } from '@/types'

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
