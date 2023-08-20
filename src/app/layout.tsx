import { LayoutProps } from '@/types'
import './globals.css'

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
