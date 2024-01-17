import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function MySubscriptionListView(props: Props) {
  const { session } = props

  const subscriptions = [{}]

  return (
    <div className="flex flex-col justify-center gap-2">
      <h6 className="py-2 text-lg text-center font-semibold lowercase">
        minhas contratações
      </h6>
      <span className="text-center text-xs bg-sky-200 p-2 rounded shadow">
        você ainda não possui contratações
      </span>
      <button className="bg-green-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200">
        contratar serviço
      </button>
    </div>
  )
}
