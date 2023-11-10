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
    <section id={id} className="flex flex-col justify-center items-center">
      <div className="mx-auto text-center">
        <h1 className="text-6xl font-semibold uppercase">{title}</h1>
        <h4 className="mx-6 text-2xl font-normal uppercase">{subtitle}</h4>
        <p className="p-2 text-lg capitalize">{description}</p>
      </div>
      <div className="flex flex-1">{children}</div>
    </section>
  )
}
