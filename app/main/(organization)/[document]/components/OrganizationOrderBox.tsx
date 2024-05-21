import { MdAddLocationAlt } from 'react-icons/md'

interface Props {}

export default function OrganizationOrderBox(props: Props) {
  const {} = props

  return (
    <div className="w-full flex flex-col sm:flex-row justify-around items-center">
      <div className="mx-auto p-2">
        <MdAddLocationAlt className="text-white" size={48} />
      </div>
      <div className="mx-auto p-2">
        <h4 className="text-4xl sm:text-2xl text-center font-bold text-sky-400 dark:text-sky-200 shrink-0">
          gestão de pedidos
        </h4>
      </div>
      <div className="mx-auto p-2">
        <span className="text-xl sm:text-lg font-thin text-slate-200/80"></span>
      </div>
    </div>
  )
}
