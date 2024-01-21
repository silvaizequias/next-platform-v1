import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function FullScreen(props: Props) {
  const { children } = props
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col max-w-lg w-full justify-center items-center">
        {children}
      </div>
    </div>
  )
}
