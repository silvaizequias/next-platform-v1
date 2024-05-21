interface Props {
  member: number
}

export default function OrganizationMemberBox(props: Props) {
  const { member } = props

  return (
    <div className="relative bg-sky-600/80 p-4 rounded-md shadow-md">
      <div className="h-80 w-full flex flex-col justify-center items-center">
        <div className="mx-auto p-2">
          <span className="text-8xl sm:text-6xl text-slate-200">{member}</span>
        </div>
        <div className="mx-auto p-2">
          <h4 className="text-4xl sm:text-2xl text-center text-sky-400 dark:text-sky-200">
            {`${member > 1 ? 'membros' : 'membro'} nesta organização`}
          </h4>
        </div>
      </div>
    </div>
  )
}
