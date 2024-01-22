import PageScreen from '@/components/page-screen'
import OrganizationListView from './views/organization-list-view'

export default function OrganizationScreen() {
  return (
    <PageScreen title="organziações do sistema">
      <div className="w-full">
        <OrganizationListView />
      </div>
    </PageScreen>
  )
}
