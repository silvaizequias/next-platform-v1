import Image from 'next/image'

export default function UserMenu() {
  const avatar = '/avatar.svg'

  return (
    <div>
      <span className="flex rounded-full mx-auto p-1 cursor-pointer hover:opacity-50 hover:shadow-md">
        <Image
          className="w-[24px] h-[24px] mx-auto"
          src={avatar}
          alt="dedicado"
          width={24}
          height={24}
          priority
        />
      </span>
    </div>
  )
}
