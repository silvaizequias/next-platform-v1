import { HiOutlineLogin } from 'react-icons/hi'

export default function UserBar() {
  return (
    <div className="relative">
      <span className="flex cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25">
        <HiOutlineLogin />
      </span>
    </div>
  )
}
