'use client'

import { MdPayments } from 'react-icons/md'

interface Props {}

export default function OrganizationFinanceBox(props: Props) {
  const {} = props

  return (
    <div
      className={`relative p-4 rounded-md shadow-md bg-gradient-to-r from-sky-600/80 to-sky-800/60 opacity-20 hover:opacity-80`}
    >
      <div className="h-auto w-full flex flex-col sm:flex-row justify-around items-center">
        <div className="mx-auto p-2">
          <MdPayments className="text-white" size={48} />
        </div>
        <div className="mx-auto p-2">
          <h4 className="text-4xl sm:text-2xl text-center font-bold text-sky-400 dark:text-sky-200 shrink-0">
            controle financeiro
          </h4>
        </div>
        <div className="mx-auto p-2">
          <span className="text-xl sm:text-lg font-thin text-slate-200/80"></span>
        </div>
      </div>
    </div>
  )
}
