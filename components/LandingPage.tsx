import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function LandingPage(props: Props) {
  const { children } = props

  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="p-8">{children}</div>
    </div>
  )
}
