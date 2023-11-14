import { Divider } from '@nextui-org/react'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  description?: string
  id?: string
  subtitle?: string
  title?: string
}

export default function PageSection(props: Props) {
  const { children, description, id, subtitle, title } = props

  return (
    <section id={id} className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="sm:mx-8 mx-2 text-center">
          <h1 className="my-2 sm:text-6xl text-4xl font-semibold uppercase">
            {title}
          </h1>
          <h4 className="sm:text-2xl text-lg font-normal uppercase">
            {subtitle}
          </h4>
          <div className="mx-14 my-8">
            <Divider />
          </div>
          <div className="my-10">
            <p className="sm:text-md text-sm">{description}</p>
          </div>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </section>
  )
}
