import PublicationDomainListView from './publication-management/views/publication-domain-list-view'

export default function DomainScreen() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <h4 className="py-4 text-xl lowercase">domínios das organizações</h4>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="w-full">
            <PublicationDomainListView />
          </div>
        </div>
      </div>
    </div>
  )
}
