import CrispChat from '@/components/crisp-chat'
import { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="block">
      {children}
      {!isDevelopment && <CrispChat />}
    </div>
  )
}
