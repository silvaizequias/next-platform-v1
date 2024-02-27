import { Session } from 'next-auth'
import { MdDehaze } from 'react-icons/md'

interface Props {
  session: Session
}

export default function TopMenu(props: Props) {
  const { session } = props

  return (
    <div>
      <span className="flex rounded-full mx-auto p-1 cursor-pointer hover:opacity-50 hover:shadow-md">
        <MdDehaze size={24} />
      </span>
    </div>
  )
}
