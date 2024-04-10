import { ReactNode, memo } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
  title: string
}

function PageDisplay(props: Props) {
  const { children, subtitle, title } = props

  return (
    <div className="flex flex-col">
      <div className="min-h-[60px] pt-16">
        <div className="flex justify-center">
          <div className="px-4 sm:px-8 py-8 space-y-1 text-center">
            <h4 className="text-4xl font-semibold text-sky-600 lowercase">
              {title}
            </h4>
            <small className="text-sm font-thin lowercase">{subtitle}</small>
          </div>
        </div>
      </div>
      <div className="min-h-[65vh] bg-slate-100 dark:bg-slate-600 dark:text-slate-800 shadow-md">
        <div className="block max-w-7xl mx-auto w-full px-4 sm:px-8 py-4 space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(PageDisplay)
