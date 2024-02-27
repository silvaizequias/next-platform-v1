import Image from 'next/image'
import { Suspense } from 'react'

interface Props {
  image?: string
}

export default async function ProfileAvatar(props: Props) {
  const { image } = props
  const avatar = image || '/avatar.svg'

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-800 shadow-md rounded-md">
        <div className="m-2 w-['180px'] w-h-['180px']">
          {
            <Suspense fallback={'...carregando'}>
              <Image
                className="rounded-md cursor-pointer hover:opacity-80"
                src={avatar}
                loading="lazy"
                alt="user"
                width={180}
                height={180}
              />
            </Suspense>
          }
        </div>
      </div>
    </div>
  )
}
