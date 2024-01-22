import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Box(props: Props) {
  const { children } = props

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      {children}
    </div>
  )
}
