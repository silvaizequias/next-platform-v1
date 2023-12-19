import { Session } from 'next-auth'
import Image from 'next/image'
import AppBar from '../app-bar'

interface Props {
  session: Session
}

export default function TopBar(props: Props) {
  const { session } = props
  const logotipo = '/logotipo.svg'

  return (
    <div className="fixed w-full backdrop-blur-sm bg-slate/30 dark:bg-slate-800/30 shadow-md">
      <div className="h-14 mx-auto py-1">
        <div className="min-h-full flex justify-between items-center sm:mx-8 mx-2">
          <div className="flex items-center gap-2">
            <Image
              className="my-2 w-[17px] h-[25px]"
              src={logotipo}
              alt={'dedicado'}
              priority
              width={17}
              height={25}
            />
            <h6 className="text-xl sm:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 font-semibold lowercase text-sky-400 cursor-pointer">
              dedicado
            </h6>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <AppBar session={session} />
          </div>
        </div>
      </div>
    </div>
  )
}
