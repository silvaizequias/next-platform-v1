import OpenWhatsApp from '@/components/open-whatsapp'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <OpenWhatsApp />
    </main>
  )
}
