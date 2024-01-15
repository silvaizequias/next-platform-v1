import { actionGetPublicationByParams } from '../../[slug]/actions'
import { PublicationType } from '../../types'
import EditorPublicationUpdateScreen from './screen'

export default async function EditorPostUpdatePage({
  params,
}: {
  params: { slug: string }
}) {
  const publication: PublicationType | any = await actionGetPublicationByParams(params?.slug)

  return <EditorPublicationUpdateScreen publication={publication} />
}
