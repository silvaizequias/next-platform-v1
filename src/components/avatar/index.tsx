import { Session } from 'next-auth'
import Image from 'next/image'

interface Props {
  image?: string
  session?: Session
  size?: number
}

export default function Avatar(props: Props) {
  const { image, session, size } = props
  const avatar = '/avatar.svg'

  return (
    <div className="rounded-full p-2 hover:opacity-75 cursor-pointer">
      <Image
        className={`w-[${size || 28}px] sm:w-[${size || 32}px] h-[${
          size || 28
        }px] sm:h-[${size || 32}px]`}
        src={image || session?.user?.image || avatar}
        alt={session?.user?.name || 'user avatar'}
        priority
        width={size || 32}
        height={size || 32}
      />
    </div>
  )
}
