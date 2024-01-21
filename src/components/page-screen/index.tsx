import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: string
}

export default function PageScreen(props: Props) {
  const { children, title } = props

  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <h4 className="py-4 text-2xl text-center lowercase">{title}</h4>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
