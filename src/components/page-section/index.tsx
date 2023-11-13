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
      <div className="flex flex-col items-center gap-2">
        <div className="sm:mx-8 mx-2 text-center">
          <h1 className="sm:text-6xl text-4xl font-semibold uppercase">
            {title}
          </h1>
          <h4 className="sm:text-2xl text-lg font-normal uppercase">
            {subtitle}
          </h4>
          <p className=" sm:text-sm text-xs capitalize">{description}</p>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </section>
  )
}
