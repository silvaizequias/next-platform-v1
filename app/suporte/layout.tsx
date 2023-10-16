import { ReactNode } from 'react'

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col justify-center min-h-screen overflow-hidden'>
      {children}
    </div>
  )
}
