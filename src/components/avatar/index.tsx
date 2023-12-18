import { Session } from 'next-auth'
import Image from 'next/image'

interface Props {
  image?: string
  session?: Session
}

export default function Avatar(props: Props) {
  const { image, session } = props
  const avatar = '/avatar.svg'

  return (
    <div className="rounded-full p-2 hover:opacity-75 cursor-pointer">
      <Image
        className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px]"
        src={image || session?.user?.image || avatar}
        alt={session?.user?.name || 'user avatar'}
        priority
        width={32}
        height={32}
      />
    </div>
  )
}
