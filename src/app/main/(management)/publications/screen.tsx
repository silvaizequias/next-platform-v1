import PageScreen from '@/components/page-screen'
import PublicationListView from './view/publication-list-view'

export default function PublicationScreen() {
  return (
    <PageScreen title="gestão de publicações">
      <div className="w-full">
        <PublicationListView />
      </div>
    </PageScreen>
  )
}
