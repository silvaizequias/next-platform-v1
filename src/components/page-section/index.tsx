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
    <section id={id} className="flex flex-wrap mx-auto">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center">
          <h1 className="text-6xl font-semibold uppercase">{title}</h1>
          <h4 className="text-2xl font-normal uppercase">{subtitle}</h4>
          <p className="text-lg capitalize">{description}</p>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </section>
  )
}
