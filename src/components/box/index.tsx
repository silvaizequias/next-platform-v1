import { ReactNode } from 'react'

export default function Box({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <div className="mx-2 sm:mx-8 py-4">{children}</div>
    </div>
  )
}
