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
        <div className="text-center mx-2">
          <h1 className="sm:text-6xl text-4xl font-semibold uppercase">
            {title}
          </h1>
          <h4 className="sm:text-2xl text-xl font-normal uppercase">
            {subtitle}
          </h4>
          <p className=" sm:text-sm text-lg capitalize">{description}</p>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </section>
  )
}
