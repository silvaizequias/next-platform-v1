import actionGetOrganizationByDocument from '../main/(management)/organizations/[document]/actions'
import { OrganizationType } from '../main/(management)/organizations/types'
import { actionGetPublications } from './actions'
import { PublicationType } from './types'
import PublicationView from './views/publication-view'

export default async function BlogPage() {
  const publications: PublicationType[] = await actionGetPublications()

  const logotipo = '/logotipo.svg'

  let style = {
    backgroundImage: 'url(' + logotipo + ')',
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="z-auto overflow-hidden w-full">
        <div style={style} className="m-0 min-w-screen bg-cover bg-center">
          <div className="relative block backdrop-brightness-50 backdrop-blur-sm">
            <div className="z-auto p-16 min-h-80 h-auto max-w-sm sm:max-w-4xl mx-auto">
              <div className="w-full flex flex-1 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="font-bold text-center text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
                    blog dedicado
                  </h2>
                  <h6 className="font-semibold text-center text-xs sm:text-base text-slate-200 uppercase">
                    conteúdo inteligente
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {publications && <PublicationView publications={publications} />}
    </div>
  )
}
