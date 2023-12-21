import SolutionListView from './views/SolutionListView'
import CreateSolutionForm from './views/form/CreateSolutionForm'

export default function SolutionScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <CreateSolutionForm />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">
          <SolutionListView />
        </div>
      </div>
    </div>
  )
}
