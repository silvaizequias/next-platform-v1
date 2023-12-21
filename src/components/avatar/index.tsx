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
    <Image
      className={`w-[${size || 24}px] sm:w-[${size || 28}px] h-[${
        size || 24
      }px] sm:h-[${size || 28}px]`}
      src={image || session?.user?.image || avatar}
      alt={session?.user?.name || 'user avatar'}
      priority
      width={size || 28}
      height={size || 28}
    />
  )
}
