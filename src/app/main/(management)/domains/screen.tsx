import PageScreen from '@/components/page-screen'
import PublicationDomainListView from './publication-management/views/publication-domain-list-view'

export default function DomainScreen() {
  return (
    <PageScreen title="domínios das organizações">
      <div className="w-full">
        <PublicationDomainListView />
      </div>
    </PageScreen>
  )
}
