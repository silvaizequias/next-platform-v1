import CrispChat from '@/components/crisp-chat'
import { ReactNode } from 'react'

export default function LandingLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div>
      {children}
      {!isDevelopment && <CrispChat />}
    </div>
  )
}
