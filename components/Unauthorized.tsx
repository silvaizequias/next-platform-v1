import { MdGppMaybe } from 'react-icons/md'

interface Props {
  message?: string
  statusCode?: number
}

export default function Unauthorized(props: Props) {
  const { message, statusCode } = props

  return (
    <div className="relative">
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <span className="flex flex-col justify-center items-center rounded-xl p-2 text-orange-400 bg-orange-400/25 shadow-md">
          <MdGppMaybe size={38} />
          {statusCode}
        </span>
        <h4 className="text-lg text-orange-400 font-semibold lowercase">
          {`${
            message + ': '
          } você não tem autorização para acessar esse conteúdo`}
        </h4>
      </div>
    </div>
  )
}
