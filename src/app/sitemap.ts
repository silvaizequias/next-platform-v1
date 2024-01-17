import { headers } from 'next/headers'
import { PublicationType } from './main/(management)/publications/types'

const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
const PUBLICATION_AUTHORIZATION_KEY = process.env.PUBLICATION_AUTHORIZATION_KEY!

export async function actionGetPublications() {
  const organization = '52378516000178'
  const response = await fetch(
    `${PUBLICATION_API_URL}/domains/organization/${organization}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authorization: PUBLICATION_AUTHORIZATION_KEY,
      },
    },
  )
  if (!response) return null
  const domain = response && (await response.json())
  const { publications } = domain

  return publications
}

export default async function Sitemap() {
  const headersList = headers()
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3210', `.${process.env.NEXT_PUBLIC_URL}`)

  const publication: PublicationType | any = await actionGetPublications()

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...publication?.map(({ slug, updatedAt }: any) => ({
      url: `https://blog.${domain}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
  ]
}
