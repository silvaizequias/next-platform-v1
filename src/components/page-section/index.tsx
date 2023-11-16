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
    <section
      id={id}
      className="h-screen sm:min-h-screen flex flex-col justify-center"
    >
      <div className="mx-2 sm:mx-8 text-center">
        <div className="my-2 sm:my-4 mx-auto md:mx-40">
          <h1 className="text-4xl sm:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-800 font-semibold uppercase">
            {title}
          </h1>
        </div>
        <div className="my-2 sm:my-4 mx-auto md:mx-40">
          <h4 className="text-lg sm:text-2xl font-normal uppercase">
            {subtitle}
          </h4>
        </div>
        <div className="my-6 mx-24 sm:mx-40 md:mx-60">
          <Divider />
        </div>
        <div className="my-2 sm:my-4 mx-auto md:mx-60">
          <p className="italic">{description}</p>
        </div>
      </div>
      <div className="my-2 sm:my-8 mx-auto">{children}</div>
    </section>
  )
}
