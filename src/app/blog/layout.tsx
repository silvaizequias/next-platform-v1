import { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="block">{children}</div>
    </div>
  )
}
