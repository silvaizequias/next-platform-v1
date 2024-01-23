import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function Topbar(props: Props) {
  const { children } = props
  const logotipo = '/logotipo.svg'

  return (
    <div className="fixed w-full z-10 backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="h-14 mx-auto py-1">
        <div className="flex flex-row items-center justify-center min-h-full">
          <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
            <div className="flex items-center justify-between gap-2">
              <Link href={'/'} className="flex items-center gap-2">
                <Image
                  className="w-[17px] h-[25px]"
                  src={logotipo}
                  alt={'dedicado'}
                  priority
                  width={17}
                  height={25}
                />
                <h4 className="text-xl sm:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase cursor-pointer">
                  dedicado
                </h4>
              </Link>
              <div className="flex flex-1 justify-end">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
