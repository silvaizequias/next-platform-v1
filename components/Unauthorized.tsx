import { MdGppMaybe } from 'react-icons/md'

interface Props {
  message?: string
  statusCode?: number
}

export default function Unauthorized(props: Props) {
  const { message, statusCode } = props

  return (
    <div className="relative">
      <div className="w-full flex flex-col justify-center items-center space-y-2">
        <span className="flex rounded-full p-2 text-sky-600 bg-sky-400/25">
          <MdGppMaybe size={64} />
        </span>
        <h4 className="text-2xl text-center text-sky-600 font-semibold lowercase">
          {`${message} || você não tem autorização para acessar essa página`}
        </h4>
      </div>
    </div>
  )
}
