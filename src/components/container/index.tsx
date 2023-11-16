import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen sm:min-h-screen flex flex-col">
      <div className="mx-2 sm:mx-8 py-12">{children}</div>
    </div>
  )
}
