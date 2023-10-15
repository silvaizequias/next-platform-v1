import { ReactNode } from 'react'

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col justify-center min-h-screen overflow-hidden bg-sky-400'>
      {children}
    </div>
  )
}
