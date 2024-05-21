import CreateOrganizationForm from '../components/CreateOrganizationForm'

export default function CreateNewOrganizationView() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-2 my-8">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center p-4">
          <span className="text-center text-lg font-medium text-sky-400">
            através da sua organização poderá adicionar membros e utilizar todas
            as soluções dedicadas que a plataforma oferece
          </span>
        </div>
        <CreateOrganizationForm />
      </div>
    </div>
  )
}
